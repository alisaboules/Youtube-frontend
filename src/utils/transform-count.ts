export function transformCounts(counts: number): string {
  let formattedCounts: string;

  if (counts >= 1_000_000_000) {
    formattedCounts = (counts / 1_000_000_000).toFixed(1);
    formattedCounts = formattedCounts.endsWith('.0') ? formattedCounts.slice(0, -2) : formattedCounts
    return `${formattedCounts}bn`
  } else if (counts >= 1_000_000) {
    formattedCounts = (counts / 1_000_000).toFixed(1);
    formattedCounts = formattedCounts.endsWith('.0') ? formattedCounts.slice(0, -2) : formattedCounts
    return `${formattedCounts}m`
  } else if (counts >= 1_000) {
    formattedCounts = (counts / 1_000).toFixed(1);
    formattedCounts = formattedCounts.endsWith('.0') ? formattedCounts.slice(0, -2) : formattedCounts
    return `${formattedCounts}k`
  }else {
    return `${counts}`
  }
}