import { List } from "./List.mjs"
import { Enumeration } from "./Enumeration.mjs"
import { isPrimeTo, factorize, divides } from "./utils.mjs"

export class XGC_EuclidSet {
  constructor(c, m, tMax, values) {
    if (tMax <= 0) throw new Error(`Expected a positive limit. Got "${JSON.stringify(tMax)}"`)
    if (!(0 < c && c < m)) throw new Error(`Expected ${c}, ${m} such that 0 < ${c} < ${m}.`)
    this.residue = c
    this.modulus = m
    this.terms = tMax
    this.list = List([])
    if (!isPrimeTo(c, m)) return

    if (Array.isArray(values)) {
      // WARNING: This works like a backdoor. There are many conditions for an
      // array of integers to be a EuclidSet. (1) the array has to be sorted;
      // (2) the first element has to be `c + m`; (3) the last element has to be
      // less than `c + m * terms`; (4) all the values have to be congruent to
      // `c modulo m`; (5) all the values have to be prime to each other; (6)
      // the values have to be contiguous, in the sense that the values [ 3, 5,
      // 7, 11, 13, 17, 19 ] are for the EuclidSet(1,2,10), where 9 and 15 don't
      // appear because they are not prime to each of the others, but the values
      // [ 3, 5, 7, 13, 17, 19 ] are not contiguous for the EuclidSet(1,2,10),
      // because 11 doesn't appear even if it is prime to each other. Given that
      // condition (5) requires `O(n^2)` steps to verify and condition (6) would
      // require to generate the EuclidSet again, we take the risk not to verify
      // anything here.
      this.list = List(values)
      return
    }
    this.list = null
  }

  sieve() {
    return new Promise((resolve) => {
      if (this.list !== null) return resolve()
      const temp = []
      const aeTrue = 0
      const aeFalse = 1
      const coprime = List(this.terms)
      for (let t = 1; t <= this.terms; t++) {
        if (coprime[t] === aeTrue) {
          const n = this.residue + this.modulus * t
          temp.push(n)
          const factorList = factorize(n)
          while (factorList.length > 0) {
            const nextFactor = parseInt(factorList.pop(), 10)
            for (let i = nextFactor + t; i <= this.terms; i += nextFactor) {
              coprime[i] = aeFalse
            }
          }
        }
      }
      this.list = List(temp)
      resolve()
    })
  }
}

export class PartitionFinder {
  constructor(EuclidSet) {
    this.modulus = EuclidSet.modulus
    this.values = EuclidSet.list
    this.indices = List()
    this.trace = false
  }

  /* type get( int n ) */
  // type = false means n is not valid
  // type = undefined means a partition for n doesn't exist in values
  // type = XGC_Array means n = sum( XGC_Array )
  get(n) {
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
      else return resolve(undefined)
    })
  }

  /* boolean fastPart( int n ) */
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

  /* boolean slowPart( int n ) */
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
