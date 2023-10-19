import { List } from "./List.mjs"

export class Enumeration {
  constructor(indices, max) {
    this.indices = indices
    this.max = max
    this.changed = false
  }

  clone() {
    return new Enumeration(List(this.indices), this.max)
  }

  prevV() {
    const result = this.clone()
    if (result.indices[1] > 1) {
      result.indices[1] = result.indices[1] - 1
      result.changed = true
      return result
    } else return result.prevH()
  }

  prevH() {
    const result = this.clone()
    let i
    const length = result.indices.length
    if (length > 1) {
      for (i = 2; i <= length && result.indices[i] === 1; i++);
      if (i <= length) {
        result.indices[i] = result.indices[i] - 1
        for (let j = 1; j < i; j++) result.indices[j] = result.indices[i]
        result.changed = true
        return result
      } else return result
    } else return result
  }

  nextV() {
    const result = this.clone()
    const length = result.indices.length
    if (
      (length > 1 && result.indices[1] < result.indices[2]) ||
      (length === 1 && result.indices[1] < result.max)
    ) {
      result.indices[1] = result.indices[1] + 1
      result.changed = true
      return result
    } else return result.nextH()
  }

  nextH() {
    const result = this.clone()
    let i
    const length = result.indices.length
    if (length > 1) {
      for (i = 2; i < length && result.indices[i + 1] === result.indices[i]; i++);
      if (result.indices[i] < result.max) {
        result.indices[i] = result.indices[i] + 1
        for (let j = 1; j < i; j++) result.indices[j] = 1
        result.changed = true
        return result
      } else return result
    } else return result
  }
}
