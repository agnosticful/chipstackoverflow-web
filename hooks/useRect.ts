import * as React from "react";

interface Rect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

const INITIAL_RECT = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
};

function useRect(): [React.RefObject<any>, Rect] {
  const ref = React.useRef<HTMLElement>(null);
  const [rect, setRect] = React.useState<Rect>(INITIAL_RECT);

  React.useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const rect = entries[0].target.getBoundingClientRect();

        setRect({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
        });
      });

      resizeObserver.observe(ref.current);

      return () => resizeObserver.disconnect();
    }

    return () => {};
  });

  return [ref, rect];
}

export default useRect;
