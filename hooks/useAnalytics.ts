import constate from "constate";
import * as React from "react";
import useMyself from "./useMyself";

export const [AnalyticsProvider, useAnalytics] = constate(() => {
  const { myself } = useMyself();
  const fullstory = (globalThis as any).FS;

  React.useEffect(() => {
    if (myself) {
      fullstory?.identify(myself.id, {
        displayName: myself.name,
        email: myself.email,
      });
    } else {
      fullstory?.anonymize();
    }
  }, [myself]);

  const trackEvent = React.useCallback(
    (name: string, params: Record<string, any>) => {
      fullstory?.event(name, params);
    },
    []
  );

  return { trackEvent };
});

export default useAnalytics;
