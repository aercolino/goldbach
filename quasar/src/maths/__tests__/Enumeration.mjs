import { Enumeration } from "../Enumeration.mjs"
import { List } from "../List.mjs"

function expectOpResultsToBe(start, max, op, expectedEnd, expectedChanged) {
  const startEnum = new Enumeration(List(start), max)
  const endEnum = startEnum[op]()
  const end = endEnum.indices.toArray()
  const changed = endEnum.changed
  expect(end).toEqual(expectedEnd)
  expect(changed).toBe(expectedChanged)
}

describe("Enumeration", () => {
  describe("with modulus equal to 2", () => {
    // The modulus is 2, in fact indices length = modulus - 1 = 1
    describe(".prevV()", () => {
      it("should work", () => {
        expectOpResultsToBe([12], 12, "prevV", [11], true)
        expectOpResultsToBe([1], 12, "prevV", [1], false)
      })
    })

    describe(".nextV()", () => {
      it("should work", () => {
        expectOpResultsToBe([1], 12, "nextV", [2], true)
        expectOpResultsToBe([12], 12, "nextV", [12], false)
      })
    })

    describe(".prevH()", () => {
      // prevH is meaningless when the modulus is 2
      it("should work", () => {
        expectOpResultsToBe([12], 12, "prevH", [12], false)
        expectOpResultsToBe([1], 12, "prevH", [1], false)
      })
    })

    describe(".nextH()", () => {
      // nextH is meaningless when the modulus is 2
      it("should work", () => {
        expectOpResultsToBe([1], 12, "nextH", [1], false)
        expectOpResultsToBe([12], 12, "nextH", [12], false)
      })
    })
  })

  describe("with modulus greater than 2 (for instance, 4)", () => {
    // The modulus is 4, in fact indices length = modulus - 1 = 3
    describe(".prevV(p)", () => {
      it("should work", () => {
        expectOpResultsToBe([1, 1, 5], 11, "prevV", [4, 4, 4], true)
        expectOpResultsToBe([4, 4, 4], 11, "prevV", [3, 4, 4], true)
        expectOpResultsToBe([3, 4, 4], 11, "prevV", [2, 4, 4], true)
        expectOpResultsToBe([2, 4, 4], 11, "prevV", [1, 4, 4], true)
        expectOpResultsToBe([1, 4, 4], 11, "prevV", [3, 3, 4], true)
        expectOpResultsToBe([3, 3, 4], 11, "prevV", [2, 3, 4], true)
        expectOpResultsToBe([2, 3, 4], 11, "prevV", [1, 3, 4], true)
        //---
        expectOpResultsToBe([1, 1, 1], 11, "prevV", [1, 1, 1], false)
      })
    })

    describe(".nextV(p, max)", () => {
      it("should work", () => {
        expectOpResultsToBe([1, 3, 4], 11, "nextV", [2, 3, 4], true)
        expectOpResultsToBe([2, 3, 4], 11, "nextV", [3, 3, 4], true)
        expectOpResultsToBe([3, 3, 4], 11, "nextV", [1, 4, 4], true)
        expectOpResultsToBe([1, 4, 4], 11, "nextV", [2, 4, 4], true)
        expectOpResultsToBe([2, 4, 4], 11, "nextV", [3, 4, 4], true)
        expectOpResultsToBe([3, 4, 4], 11, "nextV", [4, 4, 4], true)
        expectOpResultsToBe([4, 4, 4], 11, "nextV", [1, 1, 5], true)
        //---
        expectOpResultsToBe([11, 11, 11], 11, "nextV", [11, 11, 11], false)
      })
    })

    describe(".prevH(p)", () => {
      it("should work", () => {
        expectOpResultsToBe([1, 11, 11], 11, "prevH", [10, 10, 11], true)
        expectOpResultsToBe([1, 1, 11], 11, "prevH", [10, 10, 10], true)
        //---
        expectOpResultsToBe([1, 1, 1], 11, "prevH", [1, 1, 1], false)
      })
    })

    describe(".nextH(p, max)", () => {
      it("should work", () => {
        expectOpResultsToBe([10, 10, 10], 11, "nextH", [1, 1, 11], true)
        expectOpResultsToBe([10, 10, 11], 11, "nextH", [1, 11, 11], true)
        //---
        expectOpResultsToBe([11, 11, 11], 11, "nextH", [11, 11, 11], false)
      })
    })
  })
})
