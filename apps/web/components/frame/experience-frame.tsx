import type { ReactNode } from "react";
import { Portrait } from "@/components/frame/portrait";
import { cn } from "@/lib/utils";
import packageJson from "@/package.json";
import styles from "./experience-frame.module.css";

const { version } = packageJson;

export function ExperienceFrame({
  portraitLine,
  children,
}: {
  portraitLine: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className={styles.shell}>
      <div className={cn(styles.ambientLight, styles.ambientCyan)} aria-hidden="true" />
      <div className={cn(styles.ambientLight, styles.ambientMagenta)} aria-hidden="true" />

      <section className={styles.grid}>
        <Portrait line={portraitLine} />
        <div className={styles.panel}>{children}</div>
      </section>

      <span className={cn("meta-label", styles.version)}>v{version}</span>
    </main>
  );
}
