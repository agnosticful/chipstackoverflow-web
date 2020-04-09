import * as React from "react";
import { act, create } from "react-test-renderer";
import { Subject, of } from "rxjs";
import useAuthentication from "./useAuthentication";
import { RepositoryProvider } from "./useRepository";

describe("useAuthentication()", () => {
  const repository = {
    anonymizeUserForLogging: jest.fn(),
    logEvent: jest.fn(),
    identifyUserForLogging: jest.fn(),
    onAuthenticationStateChanged: new Subject(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    subscribeUserById: jest.fn(),
  };

  beforeEach(() => {
    repository.anonymizeUserForLogging.mockName("anonymizeUserForLogging");
    repository.logEvent.mockName("logEvent");
    repository.identifyUserForLogging.mockName("identifyUserForLogging");
    repository.signIn.mockName("signIn");
    repository.signOut.mockName("signOut");
    repository.subscribeUserById.mockName("subscribeUserById");
  });

  afterEach(() => {
    repository.anonymizeUserForLogging.mockReset();
    repository.logEvent.mockReset();
    repository.identifyUserForLogging.mockReset();
    repository.onAuthenticationStateChanged = new Subject();
    repository.signIn.mockReset();
    repository.signOut.mockReset();
    repository.subscribeUserById.mockReset();
  });

  describe("user", () => {
    const userChanges: ReturnType<typeof useAuthentication>["user"][] = [];

    function Component() {
      userChanges.push(useAuthentication().user);

      return null;
    }

    beforeEach(() => {
      while (userChanges.pop()) {}
    });

    it("is null while first check", () => {
      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      for (const user of userChanges) {
        expect(user).toBeNull();
      }
    });

    it("is UserPrivate after first check", () => {
      const id = "3zthig2xgl8zhz3u";
      const name = "John Due";
      const profileImageURL = new URL("https://test.csof.dev/8qxs53nvdqefdvg9");
      const email = "opqka5030gg5saty@opqka5030gg5saty.com";

      repository.subscribeUserById.mockImplementation((id) =>
        of({ id, name, profileImageURL })
      );

      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      while (userChanges.pop()) {}

      act(() => {
        repository.onAuthenticationStateChanged.next({ id, email });
      });

      for (const user of userChanges) {
        expect(user).toEqual({ id, name, profileImageURL, email });
      }
    });

    it("is null after first check but the user doesn't have previous session", () => {
      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      while (userChanges.pop()) {}

      act(() => {
        repository.onAuthenticationStateChanged.next(null);
      });

      for (const user of userChanges) {
        expect(user).toBeNull();
      }
    });

    it("will be UserPrivate whenever authentication changes and that indicates signed in", () => {
      const firstUserId = "3zthig2xgl8zhz3u";
      const firstUserName = "John Due";
      const firstUserProfileImageURL = new URL(
        "https://test.csof.dev/p2tchi6de16nm28d"
      );
      const firstUserEmail = "opqka5030gg5saty@opqka5030gg5saty.com";
      const secondUserId = "in7i92jw5naclsoe";
      const secondUserName = "John Dewey";
      const secondUserProfileImageURL = new URL(
        "https://test.csof.dev/i65c2om66ud49r12"
      );
      const secondUserEmail = "dmnvand7qt7a4pti@3u8ejmu2niyblwp2.com";

      repository.subscribeUserById.mockImplementation((id) => {
        if (id === firstUserId) {
          return of({
            id,
            name: firstUserName,
            profileImageURL: firstUserProfileImageURL,
          });
        }

        if (id === secondUserId) {
          return of({
            id,
            name: secondUserName,
            profileImageURL: secondUserProfileImageURL,
          });
        }

        return null;
      });
      repository.onAuthenticationStateChanged.next({
        id: firstUserId,
        email: firstUserEmail,
      });

      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      while (userChanges.pop()) {}

      act(() => {
        repository.onAuthenticationStateChanged.next({
          id: secondUserId,
          email: secondUserEmail,
        });
      });

      for (const user of userChanges) {
        expect(user).toEqual({
          id: secondUserId,
          name: secondUserName,
          profileImageURL: secondUserProfileImageURL,
          email: secondUserEmail,
        });
      }
    });

    it("will be null whenever authentication changes and that indicates signed in", () => {
      const id = "ybizdou0iabee2t7";
      const name = "John Due";
      const profileImageURL = new URL("https://test.csof.dev/0hkogt7mflp920hm");
      const email = "eaod6x6bc7ja8uq0@cx7bpxg50fn1bfa8.com";

      repository.subscribeUserById.mockImplementation((_id) => {
        if (_id === id) {
          return of({
            id,
            name,
            profileImageURL,
          });
        }

        return null;
      });
      repository.onAuthenticationStateChanged.next({ id, email });

      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      while (userChanges.pop()) {}

      act(() => {
        repository.onAuthenticationStateChanged.next(null);
      });

      for (const user of userChanges) {
        expect(user).toBeNull();
      }
    });
  });

  describe("isFirstChecking", () => {
    const isFirstCheckingChanges: ReturnType<
      typeof useAuthentication
    >["isFirstChecking"][] = [];

    function Component() {
      isFirstCheckingChanges.push(useAuthentication().isFirstChecking);

      return null;
    }

    beforeEach(() => {
      while (isFirstCheckingChanges.pop()) {}
    });

    it("is true until signing in finishes", () => {
      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      for (const isFirstChecking of isFirstCheckingChanges) {
        expect(isFirstChecking).toBe(true);
      }
    });

    it("is false after signed in", () => {
      const id = "nko7lb5xpoah292n";
      const name = "John Due";
      const profileImageURL = new URL("https://test.csof.dev/42urpgwfu3g3gunt");
      const email = "v2890444p8qi5sfg@ombkt3pxcgiw0ei2.com";

      repository.subscribeUserById.mockImplementation((id) =>
        of({ id, name, profileImageURL })
      );

      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      while (isFirstCheckingChanges.pop()) {}

      act(() => {
        repository.onAuthenticationStateChanged.next({ id, email });
      });

      for (const isFirstChecking of isFirstCheckingChanges) {
        expect(isFirstChecking).toEqual(false);
      }
    });

    it("is false after tried to sign in but there's no previous session", () => {
      act(() => {
        create(
          <RepositoryProvider repository={repository as any}>
            <Component />
          </RepositoryProvider>
        );
      });

      while (isFirstCheckingChanges.pop()) {}

      act(() => {
        repository.onAuthenticationStateChanged.next(null);
      });

      for (const isFirstChecking of isFirstCheckingChanges) {
        expect(isFirstChecking).toEqual(false);
      }
    });
  });

  describe("signIn()", () => {
    let signIn: ReturnType<typeof useAuthentication>["signIn"];

    function Component() {
      signIn = useAuthentication().signIn;

      return null;
    }

    create(
      <RepositoryProvider repository={repository as any}>
        <Component />
      </RepositoryProvider>
    );

    it("signs in when it's clicked", () => {
      expect(repository.signIn).not.toHaveBeenCalled();

      signIn("");

      expect(repository.signIn).toHaveBeenCalled();
    });

    it("logs event when it's clicked", () => {
      expect(repository.signIn).not.toHaveBeenCalled();

      signIn("DUMMY_OBJECT_ID");

      expect(repository.logEvent).toHaveBeenCalledTimes(1);
      expect(repository.logEvent).toHaveBeenCalledWith("sign_in", {
        object_id: "DUMMY_OBJECT_ID",
      });
    });
  });

  describe("signOut()", () => {
    let signOut: ReturnType<typeof useAuthentication>["signOut"];

    function Component() {
      signOut = useAuthentication().signOut;

      return null;
    }

    create(
      <RepositoryProvider repository={repository as any}>
        <Component />
      </RepositoryProvider>
    );

    it("signs out when it's clicked", () => {
      expect(repository.signOut).not.toHaveBeenCalled();

      signOut();

      expect(repository.logEvent).toHaveBeenCalledTimes(1);
      expect(repository.signOut).toHaveBeenCalled();
    });

    it("logs event when it's clicked", () => {
      expect(repository.signOut).not.toHaveBeenCalled();

      signOut();

      expect(repository.logEvent).toHaveBeenCalledTimes(1);
      expect(repository.logEvent).toHaveBeenCalledWith("sign_out");
    });
  });

  it("identifies the user for logging whenever the signed in user changes", () => {
    const id = "dtogjsiqix2n726r";
    const name = "John Due";
    const profileImageURL = new URL("https://test.csof.dev/du89dxdqi5w792hw");
    const email = "opqka5030gg5saty@opqka5030gg5saty.com";

    repository.subscribeUserById.mockImplementation((id) =>
      of({ id, name, profileImageURL })
    );

    function Component() {
      useAuthentication();

      return null;
    }

    act(() => {
      create(
        <RepositoryProvider repository={repository as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(repository.identifyUserForLogging).not.toHaveBeenCalled();

    act(() => {
      repository.onAuthenticationStateChanged.next({ id, email });
    });

    expect(repository.identifyUserForLogging).toHaveBeenCalledTimes(1);
    expect(repository.identifyUserForLogging).toHaveBeenCalledWith({
      id,
      email,
      name,
      profileImageURL,
    });
  });

  it("anonymize for logging whenever the signed in user changes", async () => {
    function Component() {
      useAuthentication();

      return null;
    }

    act(() => {
      create(
        <RepositoryProvider repository={repository as any}>
          <Component />
        </RepositoryProvider>
      );
    });

    expect(repository.anonymizeUserForLogging).not.toHaveBeenCalled();

    act(() => {
      repository.onAuthenticationStateChanged.next(null);
    });

    expect(repository.anonymizeUserForLogging).toHaveBeenCalledTimes(1);
    expect(repository.anonymizeUserForLogging).toHaveBeenCalled();
  });
});
