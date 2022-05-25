import { averageReadingTime } from "./average-reading-time"

describe("averageReadingTime", () => {
  it("should calculate the correct reading time for a given number of words", () => {
    expect(averageReadingTime(Array(2250).fill("word").join(" "), 225)).toBe(10)
  })
})
