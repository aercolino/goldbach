import { XGC_Partition, XGC_EuclidSet, XGC_Array } from "../XGC.mjs"

describe("XGC_Partition", () => {
  describe("with EuclidSet(1,2,20)", () => {
    let finder
    beforeEach(() => {
      const EuclidSet = new XGC_EuclidSet(1, 2, 20, [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41])
      finder = new XGC_Partition(EuclidSet)
    })

    describe(".get(n)", () => {
      it("should work fast with n=60", () => {
        expect(finder.get(60)).toEqual({ n: 60, method: "fast", proof: new XGC_Array([19, 41]) })
      })

      it("should work slow with n=62", () => {
        expect(finder.get(62)).toEqual({ n: 62, method: "slow", proof: new XGC_Array([31, 31]) })
      })
    })

    describe(".prevV(p)", () => {
      it("should work", () => {
        expect(finder.prevV(new XGC_Array([2]))).toEqual({ value: new XGC_Array([1]), tag: true })
        expect(finder.prevV(new XGC_Array([1]))).toEqual({ value: new XGC_Array([1]), tag: false })
      })
    })

    describe(".nextV(p)", () => {
      it("should work", () => {
        expect(finder.nextV(new XGC_Array([1]), 2)).toEqual({
          value: new XGC_Array([2]),
          tag: true,
        })
        expect(finder.nextV(new XGC_Array([2]), 2)).toEqual({
          value: new XGC_Array([2]),
          tag: false,
        })
      })
    })

    describe(".prevH(p)", () => {
      it("should work", () => {
        expect(finder.prevH(new XGC_Array([2]))).toEqual({
          value: new XGC_Array([2]),
          tag: false,
        })
        expect(finder.prevH(new XGC_Array([1]))).toEqual({
          value: new XGC_Array([1]),
          tag: false,
        })
      })
    })

    describe(".nextH(p)", () => {
      it("should work", () => {
        expect(finder.nextH(new XGC_Array([2]), 2)).toEqual({
          value: new XGC_Array([2]),
          tag: false,
        })
        expect(finder.nextH(new XGC_Array([1]), 2)).toEqual({
          value: new XGC_Array([1]),
          tag: false,
        })
      })
    })
  })

  describe("with EuclidSet(14,15,20)", () => {
    let finder
    beforeEach(() => {
      const EuclidSet = new XGC_EuclidSet(
        14,
        15,
        20,
        [29, 44, 59, 89, 119, 149, 179, 239, 269, 299],
      )
      finder = new XGC_Partition(EuclidSet)
    })

    describe(".get(n)", () => {
      it("should work fast with n=4365", () => {
        expect(finder.get(4365)).toEqual({
          n: 4365,
          method: "fast",
          proof: new XGC_Array([
            179, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299,
          ]),
        })
      })

      it("should work slow with n=4395", () => {
        expect(finder.get(4395)).toEqual({
          n: 4395,
          method: "slow",
          proof: new XGC_Array([
            239, 269, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299, 299,
          ]),
        })
      })
    })
  })

  describe("with EuclidSet(1,4,20)", () => {
    let finder
    beforeEach(() => {
      const EuclidSet = new XGC_EuclidSet(1, 4, 20, [5, 9, 13, 17, 29, 37, 41, 49, 53, 61, 73])
      finder = new XGC_Partition(EuclidSet)
    })

    describe(".prevV(p)", () => {
      it("should work", () => {
        expect(finder.prevV(new XGC_Array([2]))).toEqual({ value: new XGC_Array([1]), tag: true })
        expect(finder.prevV(new XGC_Array([1]))).toEqual({ value: new XGC_Array([1]), tag: false })
      })
    })

    // describe(".nextV(p)", () => {
    //   it("should work", () => {
    //     expect(finder.nextV(new XGC_Array([1]), 2)).toEqual({
    //       value: new XGC_Array([2]),
    //       tag: true,
    //     })
    //     expect(finder.nextV(new XGC_Array([2]), 2)).toEqual({
    //       value: new XGC_Array([2]),
    //       tag: false,
    //     })
    //   })
    // })

    // describe(".prevH(p)", () => {
    //   it("should work", () => {
    //     expect(finder.prevH(new XGC_Array([2]))).toEqual({
    //       value: new XGC_Array([2]),
    //       tag: false,
    //     })
    //     expect(finder.prevH(new XGC_Array([1]))).toEqual({
    //       value: new XGC_Array([1]),
    //       tag: false,
    //     })
    //   })
    // })

    // describe(".nextH(p)", () => {
    //   it("should work", () => {
    //     expect(finder.nextH(new XGC_Array([2]), 2)).toEqual({
    //       value: new XGC_Array([2]),
    //       tag: false,
    //     })
    //     expect(finder.nextH(new XGC_Array([1]), 2)).toEqual({
    //       value: new XGC_Array([1]),
    //       tag: false,
    //     })
    //   })
    // })
  })
})
