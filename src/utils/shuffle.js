export function shuffleChoices(arr, seed) {
  if (arr.length <= 2) return arr;
  const a = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 16807) % 2147483647;
    const j = ((h < 0 ? h + 2147483647 : h) % (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
