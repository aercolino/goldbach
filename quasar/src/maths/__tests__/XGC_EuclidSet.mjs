import { XGC_EuclidSet } from "../XGC.mjs"

describe("XGC_EuclidSet", () => {
  describe("constructor(c, m)", () => {
    it("should throw when c <= 0", () => {
      expect(() => new XGC_EuclidSet(0, 2)).toThrow()
      expect(() => new XGC_EuclidSet(-5, 2)).toThrow()
    })

    it("should throw when c >= m", () => {
      expect(() => new XGC_EuclidSet(2, 2)).toThrow()
      expect(() => new XGC_EuclidSet(5, 2)).toThrow()
    })

    it("should work when c is not prime to m", () => {
      expect(() => new XGC_EuclidSet(3, 15)).not.toThrow()
    })

    it("should work when c is prime to m", async () => {
      expect(() => new XGC_EuclidSet(1, 2)).not.toThrow()
      expect(() => new XGC_EuclidSet(14, 15)).not.toThrow()
    })
  })

  describe(".find(tMax)", () => {
    it("should throw when the limit is not positive", async () => {
      const finder = new XGC_EuclidSet(1, 2)
      await expect(() => finder.find(0)).rejects.toThrow()
      await expect(() => finder.find(-5)).rejects.toThrow()
    })

    it("should work when c is not prime to m", async () => {
      const finder = new XGC_EuclidSet(3, 15)
      const list = await finder.find(150)
      expect(list.toArray()).toEqual([])
    })

    it("should work when c is prime to m", async () => {
      const EuclidSet_1_2 = new XGC_EuclidSet(1, 2)
      const list_1_2_150 = await EuclidSet_1_2.find(150)
      expect(list_1_2_150.toArray()).toEqual([
        3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
        101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
        193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
        293,
      ])

      const EuclidSet_14_15 = new XGC_EuclidSet(14, 15)
      const list_14_15_150 = await EuclidSet_14_15.find(150)
      expect(list_14_15_150.toArray()).toEqual([
        29, 44, 59, 89, 119, 149, 179, 239, 269, 299, 359, 389, 419, 449, 479, 509, 569, 599, 659,
        719, 779, 809, 839, 929, 1019, 1049, 1109, 1229, 1259, 1289, 1319, 1409, 1439, 1499, 1559,
        1619, 1709, 1739, 1889, 1949, 1979, 2039, 2069, 2099, 2129,
      ])
    })
  })
})
