export default function getRelativeDateString(date: Date): string {
  const now = new Date();

  const yearDiff = now.getFullYear() - date.getFullYear();
  if (yearDiff) return `${yearDiff} ${yearDiff === 1 ? "year" : "years"}`;

  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff) return `${monthDiff} ${monthDiff === 1 ? "month" : "months"}`;

  const dayDiff = now.getDate() - date.getDate();
  const weekDiff = Math.floor(dayDiff / 7);
  if (weekDiff) return `${weekDiff} ${weekDiff === 1 ? "week" : "weeks"}`;

  if (dayDiff) return `${dayDiff} ${dayDiff === 1 ? "day" : "days"}`;

  const hourDiff = now.getHours() - date.getHours();
  if (hourDiff) return `${hourDiff} ${hourDiff === 1 ? "hour" : "hours"}`;

  const minuteDiff = now.getMinutes() - date.getMinutes();
  if (minuteDiff)
    return `${minuteDiff} ${minuteDiff === 1 ? "minute" : "minutes"}`;

  const secondDiff = now.getSeconds() - date.getSeconds();
  return `${secondDiff} ${secondDiff === 1 ? "second" : "seconds"}`;
}

export function getRelativeShortDateString(date: Date): string {
  const now = new Date();

  const yearDiff = now.getFullYear() - date.getFullYear();
  if (yearDiff) return `${yearDiff} y`;

  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff) return `${monthDiff} m`;

  const dayDiff = now.getDate() - date.getDate();
  const weekDiff = Math.floor(dayDiff / 7);
  if (weekDiff) return `${weekDiff} w`;

  if (dayDiff) return `${dayDiff} d`;

  const hourDiff = now.getHours() - date.getHours();
  if (hourDiff) return `${hourDiff} h`;

  const minuteDiff = now.getMinutes() - date.getMinutes();
  if (minuteDiff) return `${minuteDiff} ${minuteDiff === 1 ? "min" : "mins"}`;

  const secondDiff = now.getSeconds() - date.getSeconds();
  return `${secondDiff} ${secondDiff === 1 ? "sec" : "secs"}`;
}
