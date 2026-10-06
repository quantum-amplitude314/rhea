"use client";

import { type ComponentProps, useEffect, useRef } from "react";

export function FocusedHeading(props: ComponentProps<"h1">) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return <h1 ref={headingRef} tabIndex={-1} {...props} />;
}
