import { List } from "./List.mjs"
import { Enumeration } from "./Enumeration.mjs"
import { isPrimeTo, factorize, divides } from "./utils.mjs"

export class XGC_EuclidSet {
  /**
   * @param {Integer} c An integer greater than 0
   * @param {Integer} m An integer greater than c
   */
  constructor(c, m) {
    if (!(0 < c && c < m)) throw new Error(`Expected ${c}, ${m} such that 0 < ${c} < ${m}.`)
    this.residue = c
    this.modulus = m
  }

  /**
   * Filter the numbers of the class c modulo m, from c + m to c + m * tMax,
   * removing all greater ones that are not prime to the selected ones.
   *
   * @param {Integer} tMax A maximum number of terms to filter, from from c + m
   * to c + m * tMax
   * @returns {Promise<List>}
   */
  find(tMax) {
    if (tMax <= 0)
      return Promise.reject(new Error(`Expected a positive limit. Got "${JSON.stringify(tMax)}"`))
    if (!isPrimeTo(this.residue, this.modulus)) return Promise.resolve(List([]))
    return new Promise((resolve) => {
      const temp = []
      const aeTrue = 0
      const aeFalse = 1
      const coprime = List(tMax)
      for (let t = 1; t <= tMax; t++) {
        if (coprime[t] === aeTrue) {
          const n = this.residue + this.modulus * t
          temp.push(n)
          const factorList = factorize(n)
          while (factorList.length > 0) {
            const nextFactor = parseInt(factorList.pop(), 10)
            for (let i = nextFactor + t; i <= tMax; i += nextFactor) {
              coprime[i] = aeFalse
            }
          }
        }
      }
      resolve(List(temp))
    })
  }
}

export class XGC_Partition {
  /**
   * @param {XGC_EuclidSet} EuclidSet
   * @param {List} list
   */
  constructor(EuclidSet, list) {
    this.residue = EuclidSet.residue
    this.modulus = EuclidSet.modulus
    this.values = list
    this.indices = List()
    this.trace = false
  }

  /**
   * Get a partition of n using m members of the current XGC_EuclidSet.
   *
   * @param {Integer} n
   * @returns {Promise<List|undefined|false>} A combination with repetitions of
   * m members of the current XGC_EuclidSet. In particular, a false result means
   * that n is not valid; an undefined result means that a partition for n
   * doesn't exist for the current XGC_EuclidSet.
   */
  find(n) {
    return new Promise((resolve) => {
      const sourceList = this.values
      const sourceLen = sourceList.length
      const sourceMin = sourceList[1]
      const sourceMax = sourceList[sourceLen]

      const validInput =
        divides(this.modulus, n) && n >= this.modulus * sourceMin && n <= this.modulus * sourceMax
      if (!validInput) return resolve(false)

      if (this.fastPart(n))
        return resolve({
          n,
          method: "fast",
          proof: sourceList.pick(this.indices),
        })
      else if (this.slowPart(n))
        return resolve({
          n,
          method: "slow",
          proof: sourceList.pick(this.indices),
        })
      else
        return resolve({
          n,
          proof: undefined,
        })
    })
  }

  /**
   * Find a partition of n using a greedy combination
   *
   * @param {Integer} n
   * @returns {Boolean} TRUE if the greedy combination is a partition of n
   */
  fastPart(n) {
    if (this.trace) console.log(`----- fastPart(${n}) -----`)
    const sourceList = this.values
    const sourceMin = sourceList[1]

    let lastAddendum = n
    let found
    const oneLess = this.modulus - 1
    this.indices = List(oneLess)
    for (let i = oneLess; i > 0; i--) {
      found = sourceList.findMaxLTEIndex(lastAddendum - i * sourceMin)
      this.indices[i] = found
      lastAddendum -= sourceList[found]
    }
    found = sourceList.findMaxLTEIndex(lastAddendum)
    const tag = sourceList[found] === lastAddendum
    if (this.trace) console.log(String(this.indices.toArray()), "->", found, tag)
    if (tag) {
      this.indices = List([found, ...this.indices.toArray()])
      return true
    }
    return false
  }

  /**
   * Find a partition of n using an enumerated combination, starting from the
   * greedy combination, and exploring downward initially and upward eventually
   *
   * @param {Integer} n
   * @returns {Boolean} TRUE if an enumerated combination is a partition of n
   */
  slowPart(n) {
    if (this.trace) console.log(`----- slowPart(${n}) -----`)
    const sourceList = this.values
    const sourceLen = sourceList.length
    const sourceMin = sourceList[1]
    const sourceMax = sourceList[sourceLen]

    let lastAddendum = 0
    let lastIndex = 0
    const initialEnum = new Enumeration(List(this.indices), sourceLen)

    if (this.trace) console.log("prevV")
    let downwardEnum = initialEnum.prevV()
    let prevBefore = "prevV"

    while (downwardEnum.changed) {
      lastAddendum = n - sourceList.pickSum(downwardEnum.indices)
      lastIndex = sourceList.findMaxLTEIndex(lastAddendum)
      const lastBelongs = sourceList[lastIndex] === lastAddendum
      if (this.trace)
        console.log(String(downwardEnum.indices.toArray()), "->", lastIndex, lastBelongs)
      if (lastBelongs) {
        this.indices = List([lastIndex, ...downwardEnum.indices.toArray()])
        return true
      }
      if (lastAddendum > sourceMax) {
        if (prevBefore === "prevH") {
          if (this.trace) console.log("no need to keep exploring downward")
          console.log("not found")
          return false
        }
        if (this.trace) console.log("prevH")
        downwardEnum = downwardEnum.prevH()
        prevBefore = "prevH"
      } else {
        if (this.trace) console.log("prevV")
        downwardEnum = downwardEnum.prevV()
        prevBefore = "prevV"
      }
    }

    if (this.trace) console.log("nextV")
    let upwardEnum = initialEnum.nextV()
    let nextBefore = "nextV"

    while (upwardEnum.changed) {
      lastAddendum = n - sourceList.pickSum(upwardEnum.indices)
      lastIndex = sourceList.findMaxLTEIndex(lastAddendum)
      const lastBelongs = sourceList[lastIndex] === lastAddendum
      if (this.trace)
        console.log(String(upwardEnum.indices.toArray()), "->", lastIndex, lastBelongs)
      if (lastBelongs) {
        this.indices = List([lastIndex, ...upwardEnum.indices.tArray()])
        return true
      }
      if (lastAddendum < sourceMin) {
        if (nextBefore === "nextH") {
          if (this.trace) console.log("no need to keep exploring upward")
          console.log("not found")
          return false
        }
        if (this.trace) console.log("nextH")
        upwardEnum = upwardEnum.nextH()
        nextBefore = "nextH"
      } else {
        if (this.trace) console.log("nextV")
        upwardEnum = upwardEnum.nextV()
        nextBefore = "nextV"
      }
    }

    if (this.trace) console.log("not found")
    return false
  }
}
