export function getRelativeDateString(date: Date): string {
  const now = new Date();

  const diff = (now.getTime() - date.getTime()) / 1000;

  const yearDiff = Math.floor(diff / (60 * 60 * 24 * 365));
  if (yearDiff) return `${yearDiff} ${yearDiff === 1 ? "year" : "years"}`;

  const monthDiff = Math.floor(diff / (60 * 60 * 24 * 30));
  if (monthDiff) return `${monthDiff} ${monthDiff === 1 ? "month" : "months"}`;

  const weekDiff = Math.floor(diff / (60 * 60 * 24 * 7));
  if (weekDiff) return `${weekDiff} ${weekDiff === 1 ? "week" : "weeks"}`;

  const dayDiff = Math.floor(diff / (60 * 60 * 24));
  if (dayDiff) return `${dayDiff} ${dayDiff === 1 ? "day" : "days"}`;

  const hourDiff = Math.floor(diff / (60 * 60));
  if (hourDiff) return `${hourDiff} ${hourDiff === 1 ? "hour" : "hours"}`;

  const minuteDiff = Math.floor(diff / 60);
  if (minuteDiff)
    return `${minuteDiff} ${minuteDiff === 1 ? "minute" : "minutes"}`;

  return `${diff} ${diff === 1 ? "second" : "seconds"}`;
}

export function getRelativeShortDateString(date: Date): string {
  const now = new Date();

  const diff = (now.getTime() - date.getTime()) / 1000;

  const yearDiff = Math.floor(diff / (60 * 60 * 24 * 365));
  if (yearDiff) return `${yearDiff} y`;

  const monthDiff = Math.floor(diff / (60 * 60 * 24 * 28));
  if (monthDiff) return `${monthDiff} m`;

  const weekDiff = Math.floor(diff / (60 * 60 * 24 * 7));
  if (weekDiff) return `${weekDiff} w`;

  const dayDiff = Math.floor(diff / (60 * 60 * 24));
  if (dayDiff) return `${dayDiff} d`;

  const hourDiff = Math.floor(diff / (60 * 60));
  if (hourDiff) return `${hourDiff} h`;

  const minuteDiff = Math.floor(diff / 60);
  if (minuteDiff) return `${minuteDiff} ${minuteDiff === 1 ? "min" : "mins"}`;

  return `${diff} ${diff === 1 ? "sec" : "secs"}`;
}
