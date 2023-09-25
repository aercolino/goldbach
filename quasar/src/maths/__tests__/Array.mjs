import { XGC_Array } from "../XGC.mjs"

describe("XGC_Array", () => {
  describe("constructor", () => {
    it("should work with no arguments", () => {
      const array = new XGC_Array()
      expect(array.values).toEqual([0])
    })
    it("should work with an integer argument", () => {
      const array = new XGC_Array(5)
      expect(array.values).toEqual([0, 0, 0, 0, 0])
    })
    it("should work with an array arguments", () => {
      const start = [1, 2, 3]
      const array = new XGC_Array(start)
      expect(array.values).toEqual([1, 2, 3])
      expect(array).not.toBe(start)
    })
    it("should throw if anything but nothing, a number, or an array are passed as arguments", () => {
      expect(() => new XGC_Array(-2)).toThrow()
    })
  })

  describe(".getAt(index)", () => {
    it("should return the value at `index-1` and do nothing else when the argument is less than the length", () => {
      const array1 = new XGC_Array()
      expect(array1.values).toEqual([0])
      expect(array1.getAt(-1)).toBe(undefined)
      expect(array1.getAt(0)).toBe(undefined)
      expect(array1.getAt(1)).toBe(0)
      expect(array1.values).toEqual([0])

      const array2 = new XGC_Array(3)
      expect(array2.values).toEqual([0, 0, 0])
      expect(array2.getAt(2)).toBe(0)
      expect(array2.values).toEqual([0, 0, 0])

      const array3 = new XGC_Array([1, 2, 3])
      expect(array3.values).toEqual([1, 2, 3])
      expect(array3.getAt(2)).toBe(2)
      expect(array3.values).toEqual([1, 2, 3])
    })

    it("should return 0 and grow the array when the argument is greater than the length", () => {
      const array1 = new XGC_Array()
      expect(array1.values).toEqual([0])
      expect(array1.getAt(2)).toBe(0)
      expect(array1.values).toEqual([0, 0])

      const array3 = new XGC_Array([1, 2, 3])
      expect(array3.values).toEqual([1, 2, 3])
      expect(array3.getAt(5)).toBe(0)
      expect(array3.values).toEqual([1, 2, 3, 0, 0])
    })
  })
})
