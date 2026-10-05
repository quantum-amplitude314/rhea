export const isSubmitShortcut = ({
  metaKey,
  ctrlKey,
  key,
}: {
  metaKey: boolean;
  ctrlKey: boolean;
  key: string;
}) => (metaKey || ctrlKey) && key === "Enter";
