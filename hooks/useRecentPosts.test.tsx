import * as React from "react";
import { act, create } from "react-test-renderer";
import { empty, of } from "rxjs";
import useRecentPosts from "./useRecentPosts";
import { RepositoryProvider } from "./useRepository";

describe("useRecentPosts()", () => {
  const subscribeRecentPosts = jest.fn();

  beforeEach(() => {
    subscribeRecentPosts.mockName("subscribeRecentPosts");
  });

  afterEach(() => {
    subscribeRecentPosts.mockReset();
  });

  it("returns { recentPosts, ...rest } that is each event by subscribeRecentPosts()", async () => {
    subscribeRecentPosts.mockReturnValue(of(["FIRST"], ["SECOND"], ["THIRD"]));
    const returnedValue: any[] = [];

    function Component() {
      returnedValue.push(useRecentPosts().recentPosts);

      return null;
    }

    act(() => {
      create(
        <RepositoryProvider repository={{ subscribeRecentPosts } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([[], ["THIRD"]]);
  });

  it("returns { areFirstRecentPostsLoaded=false, ...rest } until the first loading finishes", async () => {
    subscribeRecentPosts.mockReturnValueOnce(empty());
    const returnedValue: any[] = [];

    function Component() {
      returnedValue.push(useRecentPosts().areFirstRecentPostsLoaded);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider repository={{ subscribeRecentPosts } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([false]);
  });

  it("returns { areFirstRecentPostsLoaded=true, ...rest } after the first loading finished", async () => {
    subscribeRecentPosts.mockReturnValueOnce(of([]));
    const returnedValue: any[] = [];

    function Component() {
      returnedValue.push(useRecentPosts().areFirstRecentPostsLoaded);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider repository={{ subscribeRecentPosts } as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([false, true]);
  });
});
