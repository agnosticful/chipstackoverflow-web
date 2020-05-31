import * as React from "react";
import useMyself from "@@/hooks/useMyself";

export default function useAnalytics() {
  const fullstory = (globalThis as any).FS;

  const trackEvent = React.useCallback(
    (name: string, params: Record<string, any>) => {
      fullstory?.event(name, params);
    },
    [fullstory]
  );

  return { trackEvent };
}

export function useAnalyticsObservation() {
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
}
