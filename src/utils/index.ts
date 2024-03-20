export function formatDate(date: number) {
  return new Date(Number(date) * 1000).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}
