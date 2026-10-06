import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";
import { loadReflection } from "@/server/load";
import { ContinueShortcut } from "./continue-shortcut";

export async function RheaReply({
  position,
  continueHref,
  continueLabel,
}: {
  position: number;
  continueHref: string;
  continueLabel: string;
}) {
  const { reflection, echo } = await loadReflection(position);

  return (
    <>
      <div className="rhea-reflection">
        <span className="meta-label">RHEA / AFTER A PAUSE</span>
        <h1 aria-label={reflection}>
          <span className="typing-reserve" aria-hidden="true">
            {reflection}
          </span>
          <TypingAnimation
            aria-hidden="true"
            className="typing-visible"
            showCursor={false}
            startOnView={false}
            typeSpeed={22}
          >
            {reflection}
          </TypingAnimation>
        </h1>
        {echo ? <p className="reflection-echo">“{echo}” — that is the part I will keep.</p> : null}
      </div>

      <div className="reflection-actions">
        <span className="reflection-shortcut">CTRL + ENTER</span>
        <Link
          href={continueHref}
          className={cn(buttonVariants({ size: "cta" }), "primary-action shadow-glow")}
        >
          {continueLabel}
          <ArrowRight data-icon="inline-end" />
        </Link>
        <ContinueShortcut href={continueHref} />
      </div>
    </>
  );
}
