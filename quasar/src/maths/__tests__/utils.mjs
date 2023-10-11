import { GCD, isPrimeTo, divides, factorize, makeArray, copyArray } from "../XGC.mjs"

describe("utils", () => {
  it("GCD should work", () => {
    expect(GCD(2, 3)).toBe(1)
    expect(GCD(6, 35)).toBe(1)
    expect(GCD(6, 18)).toBe(6)
    expect(GCD(6, 15)).toBe(3)
  })

  it("isPrimeTo should work", () => {
    expect(isPrimeTo(0, 0)).toBe(false)
    expect(isPrimeTo(1, 1)).toBe(true)
    expect(isPrimeTo(2, 2)).toBe(false)
    expect(isPrimeTo(6, 35)).toBe(true)
  })

  it("divides should work", () => {
    expect(divides(1, 1)).toBe(true)
    expect(divides(1, 3)).toBe(true)
    expect(divides(2, 3)).toBe(false)
    expect(divides(2, 4)).toBe(true)
  })

  it("factorize should work", () => {
    expect(factorize(0)).toEqual([])
    expect(factorize(1)).toEqual([])
    expect(factorize(2)).toEqual([2])
    expect(factorize(71)).toEqual([71])
    expect(factorize(72)).toEqual([2, 3])
  })

  it("makeArray should work", () => {
    expect(makeArray(0, 71)).toEqual([71])
    expect(makeArray(1, 71)).toEqual([71])
    expect(makeArray(5, 71).length).toBe(5)
    expect(makeArray(5, 71).filter((x) => x !== 71)).toEqual([])
  })

  it("copyArray should work", () => {
    const array = [1, 2, 3]
    const copied = copyArray(array)
    expect(copied).toEqual(array)
    expect(copied).not.toBe(array)
    expect(copyArray([])).toEqual([])
  })
})
