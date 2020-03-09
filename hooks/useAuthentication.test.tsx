import * as React from "react";
import { act, create } from "react-test-renderer";
import { empty, of } from "rxjs";
import { RepositoryProvider } from "../core/useRepository";
import useAuthentication from "./useAuthentication";

describe("useAuthentication()", () => {
  it("returns { isFirstChecking=true, ...rest } until it finishes checking session", async () => {
    const onAuthenticationStateChanged = of(true);
    const returnedValue: any[] = [];

    function Component() {
      returnedValue.push(useAuthentication().isFirstChecking);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={{ onAuthenticationStateChanged } as any}
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([true, false]);
  });

  it("returns { isSignedIn=true, ...rest } while onAuthenticationStateChanged() repository emits true", async () => {
    const onAuthenticationStateChanged = of(true);
    const returnedValue: any[] = [];

    function Component() {
      const { isSignedIn } = useAuthentication();

      returnedValue.push(isSignedIn);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={{ onAuthenticationStateChanged } as any}
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(returnedValue).toEqual([false, true]);
  });

  it("returns { signIn(), ...rest } that directly calls signIn() repository", async () => {
    const onAuthenticationStateChanged = empty();
    const signIn = jest.fn().mockName("signIn");

    function Component() {
      const { signIn } = useAuthentication();

      React.useEffect(() => signIn(), []);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryProvider
          repository={{ onAuthenticationStateChanged, signIn } as any}
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("returns { signOut(), ...rest } that directly calls signOut() repository", async () => {
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
          repository={{ onAuthenticationStateChanged, signOut } as any}
        >
          <Component />
        </RepositoryProvider>
      );
    });

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
