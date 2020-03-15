export default function getAgoByDate(date: Date): [number, string, string] {
  const now = new Date();
  const yearDiff = now.getFullYear() - date.getFullYear();
  if (yearDiff) return [yearDiff, "y", yearDiff === 1 ? "year" : "years"];

  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff) return [monthDiff, "m", monthDiff === 1 ? "month" : "months"];

  const dayDiff = now.getDate() - date.getDate();
  const weekDiff = Math.floor(dayDiff / 7);
  if (weekDiff) return [weekDiff, "w", weekDiff === 1 ? "week" : "weeks"];

  if (dayDiff) return [dayDiff, "d", dayDiff === 1 ? "day" : "days"];

  const hourDiff = now.getHours() - date.getHours();
  if (hourDiff) return [hourDiff, "h", hourDiff === 1 ? "hour" : "hours"];

  const minuteDiff = now.getMinutes() - date.getMinutes();
  if (minuteDiff)
    return [minuteDiff, "m", minuteDiff === 1 ? "minute" : "minutes"];

  const secondDiff = now.getSeconds() - date.getSeconds();
  return [secondDiff, "s", secondDiff === 1 ? "second" : "seconds"];
}
