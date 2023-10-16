import { PartitionFinder, XGC_EuclidSet } from "../XGC.mjs"
import { List } from "../List.mjs"

describe("PartitionFinder", () => {
  describe("with EuclidSet(1,2,20)", () => {
    let finder
    beforeEach(() => {
      const source = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]
      const EuclidSet = new XGC_EuclidSet(1, 2, 20, source)
      finder = new PartitionFinder(EuclidSet)
    })

    describe(".get(n)", () => {
      it("should work fast with n=60", async () => {
        expect(await finder.get(60)).toEqual({
          n: 60,
          method: "fast",
          proof: List([19, 41]),
        })
      })

      it("should work slow with n=62", async () => {
        expect(await finder.get(62)).toEqual({
          n: 62,
          method: "slow",
          proof: List([31, 31]),
        })
      })
    })
  })

  describe("with EuclidSet(14,15,20)", () => {
    let finder
    beforeEach(() => {
      const source = [29, 44, 59, 89, 119, 149, 179, 239, 269, 299]
      const EuclidSet = new XGC_EuclidSet(14, 15, 20, source)
      finder = new PartitionFinder(EuclidSet)
    })

    describe(".get(n)", () => {
      it("should work fast with n=4365", async () => {
        expect(await finder.get(4365)).toEqual({
          n: 4365,
          method: "fast",
          proof: List([179, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299]),
        })
      })

      it("should work slow with n=4395", async () => {
        expect(await finder.get(4395)).toEqual({
          n: 4395,
          method: "slow",
          proof: List([239, 269, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299]),
        })
      })
    })
  })
})
