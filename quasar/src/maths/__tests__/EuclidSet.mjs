import { XGC_EuclidSet } from "../XGC.mjs"

describe("XGC_EuclidSet", () => {
  it("should work", () => {
    const xgc = new XGC_EuclidSet(22, 71, 150)
    expect(xgc.values.values.length).toBe(33)
  })
})
