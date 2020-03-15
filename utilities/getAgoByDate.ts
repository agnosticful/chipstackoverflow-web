export default function getAgoByDate(date: Date): string {
  const now = new Date();
  const yearDiff = now.getFullYear() - date.getFullYear();
  if (yearDiff)
    return yearDiff === 1 ? `${yearDiff} year ago` : `${yearDiff} years ago`;

  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff)
    return monthDiff === 1
      ? `${monthDiff} month ago`
      : `${monthDiff} months ago`;

  const dateDiff = now.getDate() - date.getDate();
  const weekDiff = Math.floor(dateDiff / 7);
  if (weekDiff)
    return weekDiff === 1 ? `${weekDiff} week ago` : `${weekDiff} weeks ago`;

  if (dateDiff)
    return dateDiff === 1 ? `${dateDiff} day ago` : `${dateDiff} days ago`;

  const hourDiff = now.getHours() - date.getHours();
  if (hourDiff)
    return hourDiff === 1 ? `${hourDiff} hour ago` : `${hourDiff} hours ago`;

  const minuteDiff = now.getMinutes() - date.getMinutes();
  if (minuteDiff)
    return minuteDiff === 1
      ? `${minuteDiff} minute ago`
      : `${minuteDiff} minutes ago`;

  const secondDiff = now.getSeconds() - date.getSeconds();
  return secondDiff === 1
    ? `${secondDiff} second ago`
    : `${secondDiff} seconds ago`;
}
