export const FIRST_POSITION = 1;
export const RESULT_HREF = "/result";

export const questionHref = (position: number) => `/q/${position}`;

export const reflectionHref = (position: number) => `/q/${position}/reflection`;

export const nextHref = ({ position, total }: { position: number; total: number }) =>
  position >= total ? RESULT_HREF : questionHref(position + 1);

export const parsePosition = (raw: string) => {
  const position = Number(raw);
  const isValid = Number.isInteger(position) && position >= FIRST_POSITION;

  return isValid ? position : null;
};
