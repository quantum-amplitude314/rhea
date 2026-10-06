import type { ComponentProps } from "react";
import { TextReveal } from "@/components/ui/text-reveal";

export function Headline({
  primary,
  secondary,
  secondaryDelay,
  variant,
  ...props
}: {
  primary: string;
  secondary: string;
  secondaryDelay: number;
  variant: "invitation" | "result";
} & Omit<ComponentProps<"h1">, "children">) {
  return (
    <h1
      aria-label={`${primary} ${secondary}`}
      className="headline"
      data-variant={variant}
      {...props}
    >
      <TextReveal aria-hidden="true" className="headline-primary">
        {primary}
      </TextReveal>
      <TextReveal aria-hidden="true" delay={secondaryDelay} className="headline-secondary">
        {secondary}
      </TextReveal>
    </h1>
  );
}
