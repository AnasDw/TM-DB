export const formatTime = (dateTimeString: string): string => {
  const dt = new Date(dateTimeString);
  const hours = dt.getHours().toString().padStart(2, "0");
  const minutes = dt.getMinutes().toString().padStart(2, "0");
  const seconds = dt.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
