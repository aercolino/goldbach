import { XGC_EuclidSet } from "../XGC.js"

describe("XGC_EuclidSet", () => {
  it("should throw when the limit is not positive", () => {
    expect(() => new XGC_EuclidSet(1, 2, 0)).toThrow()
    expect(() => new XGC_EuclidSet(1, 2, -5)).toThrow()
  })

  it("should throw when c <= 0", () => {
    expect(() => new XGC_EuclidSet(0, 2, 10)).toThrow()
    expect(() => new XGC_EuclidSet(-5, 2, 10)).toThrow()
  })

  it("should throw when c >= m", () => {
    expect(() => new XGC_EuclidSet(2, 2, 10)).toThrow()
    expect(() => new XGC_EuclidSet(5, 2, 10)).toThrow()
  })

  it("should work when c is not prime to m", () => {
    const EuclidSet = new XGC_EuclidSet(3, 15, 150)
    expect(EuclidSet.values.values).toEqual([])
  })

  it("should work when c is prime to m", async () => {
    const EuclidSet_1_2_150 = new XGC_EuclidSet(1, 2, 150)
    await EuclidSet_1_2_150.sieve()
    expect(EuclidSet_1_2_150.values.values).toEqual([
      3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
      101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
      197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
    ])

    const EuclidSet_14_15_150 = new XGC_EuclidSet(14, 15, 150)
    await EuclidSet_14_15_150.sieve()
    expect(EuclidSet_14_15_150.values.values).toEqual([
      29, 44, 59, 89, 119, 149, 179, 239, 269, 299, 359, 389, 419, 449, 479, 509, 569, 599, 659,
      719, 779, 809, 839, 929, 1019, 1049, 1109, 1229, 1259, 1289, 1319, 1409, 1439, 1499, 1559,
      1619, 1709, 1739, 1889, 1949, 1979, 2039, 2069, 2099, 2129,
    ])
  })
})
