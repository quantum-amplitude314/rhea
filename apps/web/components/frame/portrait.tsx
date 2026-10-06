import Image from "next/image";
import type { ReactNode } from "react";
import { QaCredit } from "@/components/frame/qa-credit";
import { cn } from "@/lib/utils";
import styles from "./portrait.module.css";

export function Portrait({ line }: { line: ReactNode }) {
  return (
    <aside className={styles.stage}>
      <Image
        src="/rhea-portrait.avif"
        alt="A luminous synthetic woman looking directly at the viewer"
        fill
        priority
        sizes="(max-width: 860px) 100vw, 56vw"
        className={styles.image}
      />
      <div className={styles.color} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={cn(styles.orbit, styles.orbitOne)} aria-hidden="true" />
      <div className={cn(styles.orbit, styles.orbitTwo)} aria-hidden="true" />

      <div className={styles.caption}>
        {line}
        <div className={styles.credits}>
          <QaCredit />
        </div>
      </div>
    </aside>
  );
}
