import * as React from "react";

const INITIAL_RECT = new DOMRect(0, 0, 0, 0);

function useRect(): [React.RefObject<any>, DOMRect] {
  const ref = React.useRef<HTMLElement>(null);
  const [clientRect, setClientRect] = React.useState<DOMRect>(INITIAL_RECT);

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return () => {};
    }

    const element = ref.current;

    function measure() {
      window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();

        setClientRect(rect);
      });
    }

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure);

    measure();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [ref]);

  return [ref, clientRect];
}

export default useRect;
