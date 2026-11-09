/** Known destination photos, with a neutral airport travel scene until an admin uploads a cover. */
const destinationPhotos: [RegExp, string][] = [
  [/гонконг|hong.?kong|макао|macao|macau/i, "hong-kong"],
  [/китай|china|пекин|beijing/i, "china"],
  [/турци|turk|istanbul|стамбул/i, "istanbul"],
  [/оаэ|эмират|uae|emirates|dubai|дубай/i, "dubai"],
  [/таиланд|тайланд|thailand|bangkok/i, "thailand"],
  [/вьетнам|vietnam/i, "vietnam"],
];
export function destinationVisual(name: string): string {
  const entry = destinationPhotos.find(([pattern]) => pattern.test(name));
  return entry
    ? `/images/destination-${entry[1]}.webp`
    : "/images/jetstream-departure.webp";
}
