import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RheaListening({ continueLabel }: { continueLabel: string }) {
  return (
    <>
      <div className="rhea-reflection rhea-listening">
        <span className="meta-label">RHEA / LISTENING</span>
        <p className="listening-indicator" aria-hidden="true">
          <span />
          <span />
          <span />
        </p>
        <span className="sr-only">Rhea is listening</span>
      </div>

      <div className="reflection-actions">
        <span className="reflection-shortcut">CTRL + ENTER</span>
        <Button size="cta" disabled className="primary-action shadow-glow">
          {continueLabel}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </>
  );
}
