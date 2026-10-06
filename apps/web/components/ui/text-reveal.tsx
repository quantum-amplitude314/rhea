"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface TextRevealProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  children: string;
  delay?: number;
  duration?: number;
  initialOpacity?: number;
  stagger?: number;
}

export const TextReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  initialOpacity = 0.3,
  stagger = 0.32,
  ...props
}: TextRevealProps) => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const words = children.split(" ");

  return (
    <span className={cn("leading-[100%]", className)} {...props}>
      {words.map((word, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: words repeat and never reorder
        <span key={`${word}-${index}`}>
          <motion.span
            className="inline-block"
            initial={{ opacity: shouldReduceMotion ? 1 : initialOpacity }}
            animate={{ opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : delay + index * stagger,
              duration: shouldReduceMotion ? 0 : duration,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
};
