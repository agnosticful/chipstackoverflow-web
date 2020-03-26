import * as React from "react";
import { ReactTestRenderer, act, create } from "react-test-renderer";
import { Observable } from "rxjs";
import { UserId } from "../models/User";
import { RepositoryProvider } from "./useRepository";
import useUserById from "./useUserById";

describe("useUserById()", () => {
  const subscribeUserById = jest.fn();

  beforeEach(() => {
    subscribeUserById.mockName("subscribeUserById").mockReturnValue(
      new Observable(subscriber => {
        setImmediate(() => subscriber.next({}));
      })
    );
  });

  afterEach(() => {
    subscribeUserById.mockReset();
  });

  it("subscribes subscribeUserById() and triggers rendering for every change", async () => {
    function Component() {
      useUserById("loremipsum" as UserId);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider repository={{ subscribeUserById } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(subscribeUserById).toHaveBeenCalledWith("loremipsum");
  });

  it("returns { isFirstLoading: true, ...rest } until first change comes", async () => {
    const ifl: any[] = [];

    function Component() {
      ifl.push(useUserById("loremipsum" as UserId).isFirstLoading);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider repository={{ subscribeUserById } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(ifl.includes(true)).toBeTruthy();
    expect(ifl.slice(ifl.indexOf(true)).includes(false)).toBeTruthy();
  });

  it("returns { isFirstLoading: true, ...rest } again whenever the given UserId changes", async () => {
    let ifl: any[] = [];
    let userId = "johndue" as UserId;

    function Component() {
      ifl.push(useUserById(userId).isFirstLoading);

      return null;
    }

    let renderer: ReactTestRenderer;

    await act(async () => {
      renderer = create(
        <RepositoryProvider repository={{ subscribeUserById } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    ifl = [];
    userId = "janedue" as UserId;

    await act(async () => {
      renderer.update(
        <RepositoryProvider repository={{ subscribeUserById } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(ifl.includes(true)).toBeTruthy();
    expect(ifl.slice(ifl.indexOf(true)).includes(false)).toBeTruthy();
  });
});
