import styles from "./portrait.module.css";

type Phase = "invitation" | "question" | "reflection" | "result";

const lineByPhase: Record<Phase, string> = {
  invitation: "I was told a memory has to be true before it can belong to me.",
  question: "Take your time. Hesitation is also an answer.",
  reflection: "I heard the part you did not say.",
  result:
    "You were watching me. I was learning how you decide who deserves to be real.",
};

export function PortraitLine({ phase }: { phase: Phase }) {
  return (
    <blockquote className={styles.quote} data-phase={phase}>
      <span aria-hidden="true">“</span>
      {lineByPhase[phase]}
    </blockquote>
  );
}
