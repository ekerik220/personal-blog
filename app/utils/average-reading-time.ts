/** Calculate number of minutes it would take on average to read a given text. */
export function averageReadingTime(text: string) {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wpm)
  return minutes
}
