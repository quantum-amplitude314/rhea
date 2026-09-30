import type { ReactNode } from "react";
import { type Phase, Portrait } from "@/components/interview/portrait";
import { Progress, ProgressLabel } from "@/components/ui/progress";

export function ExperienceShell({
  phase,
  progress,
  children,
}: {
  phase: Phase;
  progress: number | null;
  children: ReactNode;
}) {
  return (
    <main className="electric-shell">
      <div className="ambient-light ambient-light-cyan" aria-hidden="true" />
      <div className="ambient-light ambient-light-magenta" aria-hidden="true" />

      <section id="experience" className="experience-grid">
        <Portrait phase={phase} />

        <div className="conversation-panel" data-phase={phase}>
          {progress === null ? null : (
            <div className="sequence-rail">
              <Progress
                value={progress}
                getAriaValueText={() =>
                  phase === "result"
                    ? "Interview complete"
                    : "Interview in progress"
                }
                className="sequence-progress"
              >
                <ProgressLabel className="sr-only">
                  Interview progress
                </ProgressLabel>
              </Progress>
            </div>
          )}

          {children}
        </div>
      </section>
    </main>
  );
}
