import type { ReactNode } from "react";
import { type Phase, Portrait } from "@/components/interview/portrait";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import styles from "./experience-shell.module.css";

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
    <main className={styles.shell}>
      <div
        className={cn(styles.ambientLight, styles.ambientCyan)}
        aria-hidden="true"
      />
      <div
        className={cn(styles.ambientLight, styles.ambientMagenta)}
        aria-hidden="true"
      />

      <section id="experience" className={styles.grid}>
        <Portrait phase={phase} />

        <div className={styles.panel} data-phase={phase}>
          {progress === null ? null : (
            <div className={styles.sequenceRail}>
              <Progress
                value={progress}
                getAriaValueText={() =>
                  phase === "result"
                    ? "Interview complete"
                    : "Interview in progress"
                }
                className={styles.sequenceProgress}
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
