import * as firebase from "firebase/app";

export type LogEvent = (
  name: string,
  params?: Record<string, string | number | boolean>,
  options?: { global: boolean }
) => void;

export function createLogEvent({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): LogEvent {
  return (name, params, options) => {
    firebaseApp
      .analytics()
      .logEvent(name, params, { global: false, ...options });
  };
}
