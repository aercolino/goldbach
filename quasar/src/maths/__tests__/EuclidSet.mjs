import { XGC_EuclidSet } from "../XGC.mjs"

describe("XGC_EuclidSet", () => {
  it("should work", () => {
    const EuclidSet_1_2_150 = new XGC_EuclidSet(1, 2, 150)
    expect(EuclidSet_1_2_150.values.values.length).toBe(61)

    const EuclidSet_14_15_150 = new XGC_EuclidSet(14, 15, 150)
    expect(EuclidSet_14_15_150.values.values.length).toBe(45)
  })
})
