export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const formater = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formater.format(date);
}
