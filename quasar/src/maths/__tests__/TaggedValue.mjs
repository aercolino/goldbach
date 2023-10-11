import { TaggedValue, XGC_Array } from "../XGC.mjs"

describe("TaggedValue", () => {
  it("should work with no arguments", () => {
    expect(new TaggedValue()).toEqual({ value: null, tag: false })
  })

  it("should work with a boolean argument", () => {
    expect(new TaggedValue({ tag: true })).toEqual({ value: null, tag: true })
  })

  it("should work with an array argument", () => {
    const array1 = [1]
    const tv = new TaggedValue({ value: array1 })
    expect(tv).toEqual({ value: array1, tag: false })
    expect(tv.value).not.toBe(array1)
  })

  it("should work with an XGC_Array argument", () => {
    const array1 = new XGC_Array([1])
    const tv = new TaggedValue({ value: array1 })
    expect(tv).toEqual({ value: array1, tag: false })
    expect(tv.value).not.toBe(array1)
  })

  it("should work with two arguments", () => {
    expect(new TaggedValue({ value: 4, tag: true })).toEqual({ value: 4, tag: true })
  })
})
