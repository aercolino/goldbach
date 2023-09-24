import { xgc_GCD } from "../XGC.mjs"

describe("utils", () => {
  it("xgc_GCD should work", () => {
    expect(xgc_GCD(2, 3)).toBe(1)
    expect(xgc_GCD(6, 35)).toBe(1)
    expect(xgc_GCD(6, 18)).toBe(6)
    expect(xgc_GCD(6, 15)).toBe(3)
  })
})
