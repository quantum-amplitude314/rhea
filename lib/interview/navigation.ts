export type Step = { kind: "question"; position: number } | { kind: "result" };

export const FIRST_POSITION = 1;

export const nextStep = ({
  position,
  total,
}: {
  position: number;
  total: number;
}): Step =>
  position >= total
    ? { kind: "result" }
    : { kind: "question", position: position + 1 };

export const stepHref = (step: Step) =>
  step.kind === "result" ? "/result" : `/q/${step.position}`;

export const parsePosition = (raw: string) => {
  const position = Number(raw);
  const isValid = Number.isInteger(position) && position >= FIRST_POSITION;

  return isValid ? position : null;
};
