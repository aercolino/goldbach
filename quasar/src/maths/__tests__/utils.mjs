import {
  xgc_GCD,
  xgc_IsPrimeTo,
  xgc_Divides,
  xgc_Factorize,
  makeArray,
  copyArray,
} from "../XGC.mjs"

describe("utils", () => {
  it("xgc_GCD should work", () => {
    expect(xgc_GCD(2, 3)).toBe(1)
    expect(xgc_GCD(6, 35)).toBe(1)
    expect(xgc_GCD(6, 18)).toBe(6)
    expect(xgc_GCD(6, 15)).toBe(3)
  })

  it("xgc_IsPrimeTo should work", () => {
    expect(xgc_IsPrimeTo(0, 0)).toBe(false)
    expect(xgc_IsPrimeTo(1, 1)).toBe(true)
    expect(xgc_IsPrimeTo(2, 2)).toBe(false)
    expect(xgc_IsPrimeTo(6, 35)).toBe(true)
  })

  it("xgc_Divides should work", () => {
    expect(xgc_Divides(1, 1)).toBe(true)
    expect(xgc_Divides(1, 3)).toBe(true)
    expect(xgc_Divides(2, 3)).toBe(false)
    expect(xgc_Divides(2, 4)).toBe(true)
  })

  it("xgc_Factorize should work", () => {
    expect(xgc_Factorize(0)).toEqual([])
    expect(xgc_Factorize(1)).toEqual([])
    expect(xgc_Factorize(2)).toEqual([2])
    expect(xgc_Factorize(71)).toEqual([71])
    expect(xgc_Factorize(72)).toEqual([2, 3])
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
