import type { ReactNode } from "react";
import { Portrait } from "@/interview/shell/portrait";
import { cn } from "@/lib/utils";
import styles from "./experience-frame.module.css";

export function ExperienceFrame({
  portraitLine,
  children,
}: {
  portraitLine: ReactNode;
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

      <section className={styles.grid}>
        <Portrait line={portraitLine} />
        <div className={styles.panel}>{children}</div>
      </section>
    </main>
  );
}
