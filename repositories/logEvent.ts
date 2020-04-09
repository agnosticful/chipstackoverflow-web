import * as firebase from "firebase/app";

export type LogEvent = (
  name: string,
  params?: Record<string, string | number | boolean>,
  options?: { global: boolean }
) => void;

export function createLogEvent({
  firebaseApp,
  fullstory,
}: {
  firebaseApp: firebase.app.App;
  fullstory: any;
}): LogEvent {
  return (name, params, options) => {
    firebaseApp
      .analytics()
      .logEvent(name, params, { global: false, ...options });

    fullstory?.event(name, params);
  };
}
