import Image from "next/image";
import { QaCredit } from "@/components/qa-credit";
import { cn } from "@/lib/utils";
import styles from "./portrait.module.css";

export type Phase = "invitation" | "question" | "reflection" | "result";

const lineByPhase: Record<Phase, string> = {
  invitation: "I was told a memory has to be true before it can belong to me.",
  question: "Take your time. Hesitation is also an answer.",
  reflection: "I heard the part you did not say.",
  result:
    "You were watching me. I was learning how you decide who deserves to be real.",
};

export function Portrait({ phase }: { phase: Phase }) {
  return (
    <aside className={styles.stage} data-phase={phase}>
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
        <blockquote className={styles.quote}>
          <span aria-hidden="true">“</span>
          {lineByPhase[phase]}
        </blockquote>
        <div className={styles.credits}>
          <QaCredit />
        </div>
      </div>
    </aside>
  );
}
