import { List } from "../List.js"

describe("List", () => {
  describe("constructor", () => {
    it("should work with no arguments", () => {
      const list = List()
      // BREAKING CHANGE: `new XGC_Array()` produced `[0]`
      expect(list.toArray()).toEqual([])
    })
    it("should work with an integer argument", () => {
      const list = List(5)
      expect(list.toArray()).toEqual([0, 0, 0, 0, 0])
    })
    it("should work with an array argument", () => {
      const start = [1, 2, 3]
      const list = List(start)
      expect(list.toArray()).toEqual([1, 2, 3])
      expect(list).not.toBe(start)

      expect(List([1]).toArray()).toEqual([1])
    })
    it("should work with a list argument", () => {
      const start = [1, 2, 3]
      const list1 = List(start)
      const list2 = List(list1)
      expect(list2.toArray()).toEqual([1, 2, 3])
      expect(list2).not.toBe(list1)

      expect(List([1]).toArray()).toEqual([1])
    })
    it("should throw if anything but nothing, a length, an array, or a list is passed as an argument", () => {
      expect(() => List(-2)).toThrow()
    })
  })

  describe("get value at index", () => {
    it("should return undefined if index is less than 1 or greater than the length of values", () => {
      const list1 = List()
      expect(list1[0]).toBe(undefined)
      expect(list1[-10]).toBe(undefined)
      expect(list1[2]).toBe(undefined)
      expect(list1[+10]).toBe(undefined)
    })

    it("should return the value at `index-1`", () => {
      const list1 = List()
      expect(list1.toArray()).toEqual([])
      expect(list1[1]).toBe(undefined)
      expect(list1.toArray()).toEqual([])

      const list2 = List(3)
      expect(list2.toArray()).toEqual([0, 0, 0])
      expect(list2[2]).toBe(0)
      expect(list2.toArray()).toEqual([0, 0, 0])

      const list3 = List([1, 2, 3])
      expect(list3.toArray()).toEqual([1, 2, 3])
      expect(list3[2]).toBe(2)
      expect(list3.toArray()).toEqual([1, 2, 3])
    })
  })

  describe("set value at index", () => {
    it("should throw if index is less than 1 or greater than the length of values", () => {
      const list1 = List()
      expect(() => {
        list1[0] = 4
      }).toThrow()
      expect(() => {
        list1[-10] = 4
      }).toThrow()
      expect(() => {
        list1[2] = 4
      }).toThrow()
      expect(() => {
        list1[+10] = 4
      }).toThrow()
    })

    it("should set the value at `index-1`", () => {
      const list2 = List(3)
      expect(list2.toArray()).toEqual([0, 0, 0])
      list2[2] = 4
      expect(list2.toArray()).toEqual([0, 4, 0])

      const list3 = List([1, 2, 3])
      expect(list3.toArray()).toEqual([1, 2, 3])
      list3[2] = 4
      expect(list3.toArray()).toEqual([1, 4, 3])
    })
  })

  describe(".getChoice(selection)", () => {
    it("should select values at given indexes", () => {
      const list1 = List([2, 4, 6, 8, 10])
      expect(list1.getChoice(List([2, 4])).toArray()).toEqual([4, 8])
    })
  })

  describe(".sumChoice(selection)", () => {
    it("should add up values at given positions", () => {
      const list1 = List([2, 4, 6, 8, 10])
      expect(list1.sumChoice(List([1, 3, 5]))).toBe(18)
    })
  })

  describe(".findIndex()", () => {
    it("should work with an empty list", () => {
      expect(List([]).findIndex(3)).toBe(0)
    })
    it("should work with a list of 1 item", () => {
      expect(List([3]).findIndex(3)).toBe(1)
      expect(List([3]).findIndex(2)).toBe(0)
      expect(List([3]).findIndex(4)).toBe(1)
    })
    it("should work with a list of 2 items", () => {
      expect(List([3, 5]).findIndex(2)).toBe(0)
      expect(List([3, 5]).findIndex(3)).toBe(1)
      expect(List([3, 5]).findIndex(4)).toBe(1)
      expect(List([3, 5]).findIndex(6)).toBe(2)
    })
  })
})
