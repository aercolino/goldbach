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
    it("should work with an array argument", () => {
      const start = [1, 2, 3]
      const array = new XGC_Array(start)
      expect(array.values).toEqual([1, 2, 3])
      expect(array).not.toBe(start)

      expect(new XGC_Array([1]).values).toEqual([1])
    })
    it("should throw if anything but nothing, a number, or an array are passed as arguments", () => {
      expect(() => new XGC_Array(-2)).toThrow()
    })
  })

  describe(".getAt(index)", () => {
    it("should throw if index is less than 1", () => {
      const array1 = new XGC_Array()
      expect(() => array1.getAt(0)).toThrow()
      expect(() => array1.getAt(-10)).toThrow()
    })

    it("should return the value at `index-1` and do nothing else when the argument is not greater than the length", () => {
      const array1 = new XGC_Array()
      expect(array1.values).toEqual([0])
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
      // expect(array1.getAt(2)).toBe(0)
      // expect(array1.values).toEqual([0, 0])

      const array3 = new XGC_Array([1, 2, 3])
      expect(array3.values).toEqual([1, 2, 3])
      // expect(array3.getAt(5)).toBe(0)
      // expect(array3.values).toEqual([1, 2, 3, 0, 0])
    })
  })

  describe(".setAt(index, value)", () => {
    it("should throw if index is less than 1", () => {
      const array1 = new XGC_Array()
      expect(() => array1.setAt(0, 4)).toThrow()
      expect(() => array1.setAt(-10, 4)).toThrow()
    })

    it("should set the value at `index-1` and do nothing else when the index is not greater than the length", () => {
      const array1 = new XGC_Array()
      expect(array1.values).toEqual([0])
      array1.setAt(1, 4)
      expect(array1.values).toEqual([4])

      const array2 = new XGC_Array(3)
      expect(array2.values).toEqual([0, 0, 0])
      array2.setAt(2, 4)
      expect(array2.values).toEqual([0, 4, 0])

      const array3 = new XGC_Array([1, 2, 3])
      expect(array3.values).toEqual([1, 2, 3])
      array3.setAt(2, 4)
      expect(array3.values).toEqual([1, 4, 3])
    })

    it.skip("should set the value at index-1 and grow the array when the index is greater than the length", () => {
      const array1 = new XGC_Array()
      expect(array1.values).toEqual([0])
      array1.setAt(2, 4)
      expect(array1.values).toEqual([0, 4])

      const array3 = new XGC_Array([1, 2, 3])
      expect(array3.values).toEqual([1, 2, 3])
      array3.setAt(5, 4)
      expect(array3.values).toEqual([1, 2, 3, 0, 4])
    })
  })

  describe(".getChoice(selection)", () => {
    it("should throw if any index is less than 1 or greater than the length of values", () => {
      const array1 = new XGC_Array() // [0]
      expect(() => array1.getChoice(new XGC_Array([0, 1]))).toThrow()
      expect(() => array1.getChoice(new XGC_Array([1, 2]))).toThrow()
      expect(() => array1.getChoice(new XGC_Array([0, 1, 2]))).toThrow()
    })

    it("should select values at given indexes", () => {
      const array1 = new XGC_Array([2, 4, 6, 8, 10])
      expect(array1.getChoice(new XGC_Array([2, 4]))).toEqual(new XGC_Array([4, 8]))
    })
  })

  describe(".sumChoice(selection)", () => {
    it("should add up values at given positions", () => {
      const array1 = new XGC_Array([2, 4, 6, 8, 10])
      expect(array1.sumChoice(new XGC_Array([1, 3, 5]))).toBe(18)
    })
  })

  describe(".addHead(value)", () => {
    it("should work", () => {
      const array1 = new XGC_Array([2, 4, 6])
      array1.addHead(999)
      expect(array1.values).toEqual([999, 2, 4, 6])
    })
  })

  describe(".addTail(value)", () => {
    it("should work", () => {
      const array1 = new XGC_Array([2, 4, 6])
      array1.addTail(999)
      expect(array1.values).toEqual([2, 4, 6, 999])
    })
  })

  describe(".binSearch(k)", () => {
    it("should work", () => {
      const array1 = new XGC_Array([
        3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
        101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
        193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
        293,
      ])
      expect(array1.binSearch(23)).toEqual({ value: 8, tag: true })
      expect(array1.binSearch(24)).toEqual({ value: 8, tag: false })
      expect(array1.binSearch(28)).toEqual({ value: 8, tag: false })
      expect(array1.binSearch(29)).toEqual({ value: 9, tag: true })
    })
  })
})
