import Image from "next/image";

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
    <aside className="portrait-stage" data-phase={phase}>
      <Image
        src="/rhea-portrait.avif"
        alt="A luminous synthetic woman looking directly at the viewer"
        fill
        priority
        sizes="(max-width: 860px) 100vw, 56vw"
        className="portrait-image"
      />
      <div className="portrait-color" aria-hidden="true" />
      <div className="portrait-grain" aria-hidden="true" />
      <div className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
      <div className="portrait-orbit portrait-orbit-two" aria-hidden="true" />

      <blockquote className="portrait-quote">
        <span aria-hidden="true">“</span>
        {lineByPhase[phase]}
      </blockquote>
    </aside>
  );
}
