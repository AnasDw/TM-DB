export const preventInvalidNumericInput = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (
    e.key === "." ||
    e.key === "e" ||
    e.key === "E" ||
    e.key === "+" ||
    e.key === "-"
  ) {
    e.preventDefault();
  }
};
