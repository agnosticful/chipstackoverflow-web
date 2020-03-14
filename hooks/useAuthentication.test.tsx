import * as React from "react";
import { act, create } from "react-test-renderer";
import { empty, of } from "rxjs";
import useAuthentication from "./useAuthentication";
import { RepositoryProvider } from "./useRepository";

describe("useAuthentication()", () => {
  const logEvent = jest.fn();
  const setUserIdForLogging = jest.fn();
  const subscribeUserById = jest.fn();

  beforeEach(() => {
    logEvent.mockName("logEvent");
    setUserIdForLogging.mockName("setUserIdForLogging");
    subscribeUserById.mockName("subscribeUserById");
  });

  afterEach(() => {
    logEvent.mockReset();
    setUserIdForLogging.mockReset();
    subscribeUserById.mockReset();
  });

  it("returns { isFirstChecking=true, ...rest } until it finishes checking session", async () => {
    const onAuthenticationStateChanged = of("loremipsum");
    subscribeUserById.mockReturnValue(
      of({
        id: "loremipsum",
        name: "Lorem Ipsum",
        profileImageURL: new URL("https://example.kohei.dev/example.png")
      })
    );
    const returnedValue: any[] = [];

    function Component() {
      returnedValue.push(useAuthentication().isFirstChecking);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={
            {
              logEvent,
              onAuthenticationStateChanged,
              setUserIdForLogging,
              subscribeUserById
            } as any
          }
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([true, false]);
  });

  it("returns { isSignedIn=true, ...rest } while onAuthenticationStateChanged() repository emits true", async () => {
    const onAuthenticationStateChanged = of("loremipsum");
    subscribeUserById.mockReturnValue(
      of({
        id: "loremipsum",
        name: "Lorem Ipsum",
        profileImageURL: new URL("https://example.kohei.dev/example.png")
      })
    );
    const returnedValue: any[] = [];

    function Component() {
      const { user } = useAuthentication();

      returnedValue.push(user);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={
            {
              logEvent,
              onAuthenticationStateChanged,
              setUserIdForLogging,
              subscribeUserById
            } as any
          }
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([
      null,
      {
        id: "loremipsum",
        name: "Lorem Ipsum",
        profileImageURL: new URL("https://example.kohei.dev/example.png")
      }
    ]);
  });

  it("returns { signIn(), ...rest } that calls signIn() repository", async () => {
    const onAuthenticationStateChanged = empty();
    const signIn = jest.fn().mockName("signIn");

    function Component() {
      const { signIn } = useAuthentication();

      React.useEffect(() => signIn("THIS_IS_OBJECT_ID"), []);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={
            {
              logEvent,
              onAuthenticationStateChanged,
              setUserIdForLogging,
              subscribeUserById,
              signIn
            } as any
          }
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(signIn).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith("sign_in", {
      object_id: "THIS_IS_OBJECT_ID"
    });
  });

  it("returns { signOut(), ...rest } that calls signOut() repository", async () => {
    const onAuthenticationStateChanged = empty();
    const signOut = jest.fn().mockName("signOut");

    function Component() {
      const { signOut } = useAuthentication();

      React.useEffect(() => signOut(), []);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={
            {
              logEvent,
              onAuthenticationStateChanged,
              setUserIdForLogging,
              subscribeUserById,
              signOut
            } as any
          }
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(signOut).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith("sign_out");
  });
});
