import { PartitionFinder, XGC_EuclidSet } from "../XGC.mjs"
import { List } from "../List.mjs"

describe("PartitionFinder", () => {
  describe("with EuclidSet(1,2,20)", () => {
    let finder
    let nextMax
    beforeEach(() => {
      const source = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]
      nextMax = source.length // 12
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

    describe(".prevV(p)", () => {
      it("should work", () => {
        expect(finder.prevV(List([12]))).toEqual({ value: List([11]), tag: true })
        expect(finder.prevV(List([1]))).toEqual({ value: List([1]), tag: false })
      })
    })

    describe(".nextV(p, max)", () => {
      it("should work", () => {
        expect(finder.nextV(List([1]), nextMax)).toEqual({
          value: List([2]),
          tag: true,
        })
        expect(finder.nextV(List([12]), nextMax)).toEqual({
          value: List([12]),
          tag: false,
        })
      })
    })

    describe(".prevH(p)", () => {
      it("should work", () => {
        expect(finder.prevH(List([12]))).toEqual({
          value: List([12]),
          tag: false,
        })
        expect(finder.prevH(List([1]))).toEqual({
          value: List([1]),
          tag: false,
        })
      })
    })

    describe(".nextH(p, max)", () => {
      it("should work", () => {
        expect(finder.nextH(List([1]), nextMax)).toEqual({
          value: List([1]),
          tag: false,
        })
        expect(finder.nextH(List([12]), nextMax)).toEqual({
          value: List([12]),
          tag: false,
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

  describe("with EuclidSet(1,4,20)", () => {
    let finder
    let nextMax
    beforeEach(() => {
      const source = [5, 9, 13, 17, 29, 37, 41, 49, 53, 61, 73]
      nextMax = source.length // 11
      const EuclidSet = new XGC_EuclidSet(1, 4, 20, source)
      finder = new PartitionFinder(EuclidSet)
    })

    describe(".prevV(p)", () => {
      it("should work", () => {
        expect(finder.prevV(List([1, 1, 5]))).toEqual({
          value: List([4, 4, 4]),
          tag: true,
        })
        expect(finder.prevV(List([4, 4, 4]))).toEqual({
          value: List([3, 4, 4]),
          tag: true,
        })
        expect(finder.prevV(List([3, 4, 4]))).toEqual({
          value: List([2, 4, 4]),
          tag: true,
        })
        expect(finder.prevV(List([2, 4, 4]))).toEqual({
          value: List([1, 4, 4]),
          tag: true,
        })
        expect(finder.prevV(List([1, 4, 4]))).toEqual({
          value: List([3, 3, 4]),
          tag: true,
        })
        expect(finder.prevV(List([3, 3, 4]))).toEqual({
          value: List([2, 3, 4]),
          tag: true,
        })
        expect(finder.prevV(List([2, 3, 4]))).toEqual({
          value: List([1, 3, 4]),
          tag: true,
        })
        //---
        expect(finder.prevV(List([1, 1, 1]))).toEqual({
          value: List([1, 1, 1]),
          tag: false,
        })
      })
    })

    describe(".nextV(p, max)", () => {
      it("should work", () => {
        expect(finder.nextV(List([1, 3, 4]), nextMax)).toEqual({
          value: List([2, 3, 4]),
          tag: true,
        })
        expect(finder.nextV(List([2, 3, 4]), nextMax)).toEqual({
          value: List([3, 3, 4]),
          tag: true,
        })
        expect(finder.nextV(List([3, 3, 4]), nextMax)).toEqual({
          value: List([1, 4, 4]),
          tag: true,
        })
        expect(finder.nextV(List([1, 4, 4]), nextMax)).toEqual({
          value: List([2, 4, 4]),
          tag: true,
        })
        expect(finder.nextV(List([2, 4, 4]), nextMax)).toEqual({
          value: List([3, 4, 4]),
          tag: true,
        })
        expect(finder.nextV(List([3, 4, 4]), nextMax)).toEqual({
          value: List([4, 4, 4]),
          tag: true,
        })
        expect(finder.nextV(List([4, 4, 4]), nextMax)).toEqual({
          value: List([1, 1, 5]),
          tag: true,
        })
        //---
        expect(finder.nextV(List([11, 11, 11]), nextMax)).toEqual({
          value: List([11, 11, 11]),
          tag: false,
        })
      })
    })

    describe(".prevH(p)", () => {
      it("should work", () => {
        expect(finder.prevH(List([1, 11, 11]))).toEqual({
          value: List([10, 10, 11]),
          tag: true,
        })
        expect(finder.prevH(List([1, 1, 11]))).toEqual({
          value: List([10, 10, 10]),
          tag: true,
        })
        //---
        expect(finder.prevH(List([1, 1, 1]))).toEqual({
          value: List([1, 1, 1]),
          tag: false,
        })
      })
    })

    describe(".nextH(p, max)", () => {
      it("should work", () => {
        expect(finder.nextH(List([10, 10, 10]), nextMax)).toEqual({
          value: List([1, 1, 11]),
          tag: true,
        })
        expect(finder.nextH(List([10, 10, 11]), nextMax)).toEqual({
          value: List([1, 11, 11]),
          tag: true,
        })
        //---
        expect(finder.nextH(List([11, 11, 11]), nextMax)).toEqual({
          value: List([11, 11, 11]),
          tag: false,
        })
      })
    })
  })
})
