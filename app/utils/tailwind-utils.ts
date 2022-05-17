export function prefix(prefix: string, classes: Array<string>) {
  return classes.map((c) => `${prefix}${c}`).join(" ")
}
