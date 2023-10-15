/* to simplify maths we don't compute primes */
// you can change this string to meet your needs
import primesList from "./primes.mjs"

import { List } from "./List.mjs"

/* the following three variables absorb the primes string above */
const primes = primesList.sort((a, b) => a - b)
const maxPrime = primes[primes.length - 1]
export const maxFactorable = maxPrime * maxPrime

/* int GCD( int a, int b ) */
// gets the Greatest Common Divisor of a and b
export function GCD(a, b) {
  let remainder = 0
  let max = Math.max(a, b)
  let min = Math.min(a, b)
  while (min > 0) {
    remainder = max % min
    max = min
    min = remainder
  }
  return max
}

/* boolean isPrime( int p ) */
// true means that p is prime
// function isPrime(p) {
//   const factorList = factorize(p);
//   if (factorList.pop() == p) return true;
//   else return false;
// }

/* boolean isPrimeTo( int a, int b ) */
// true means that the intersection between factorize( a )
// and factorize( b ) is empty
export function isPrimeTo(a, b) {
  return GCD(a, b) == 1
}

/* boolean divides( int divisor, int dividend ) */
// true means that divisor divides dividend
export function divides(divisor, dividend) {
  return dividend % divisor == 0
}

/* Array factorize( int n ) */
// undefined means n > maxFactorable
// gets the factors of n (without their multiplicities)
export function factorize(n) {
  const s = []
  if (n > maxFactorable)
    // return empty Stack
    return undefined

  const limit = Math.floor(Math.sqrt(n))
  for (let i = 0; primes[i] <= limit; i++) {
    if (divides(primes[i], n)) {
      s.push(primes[i])
      do {
        n /= primes[i]
      } while (divides(primes[i], n))
    }
  }
  if (n > limit)
    // n is prime
    s.push(n)
  return s
}

/* Array makeArray( int len, int value ) */
export function makeArray(len, value) {
  if (len <= 0) len = 1 //minimum length
  const array = new Array(len)
  for (let i = 0; i < array.length; i++) array[i] = value
  return array
}

/* Array copyArray( Array source ) */
export function copyArray(source) {
  if (!(source instanceof Array)) return []
  return source.concat()
}

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
        if (coprime[t] == aeTrue) {
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

export class TaggedValue {
  constructor({ value, tag } = { value: null, tag: false }) {
    this.value = value ? this.properValue(value) : null
    this.tag = tag ?? false
  }

  properValue(what) {
    if (what instanceof Array && what.isList) {
      return List(what)
    } else if (what instanceof Array) {
      return copyArray(what)
    } else {
      return what
    }
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
          proof: sourceList.getChoice(this.indices),
        })
      else if (this.slowPart(n))
        return resolve({
          n,
          method: "slow",
          proof: sourceList.getChoice(this.indices),
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
      found = sourceList.findIndex(lastAddendum - i * sourceMin)
      this.indices[i] = found
      lastAddendum -= sourceList[found]
    }
    found = sourceList.findIndex(lastAddendum)
    const tag = sourceList[found] === lastAddendum
    if (this.trace) console.log(String(this.indices.toArray()), "->", found, tag)
    if (tag) {
      this.indices = List([found, ...this.indices.toArray()])
      return true
    }
    return false
  }

  /* TaggedValue prevV( XGC_Array pList ) */
  prevV(pList) {
    const pp = new TaggedValue({ value: pList })
    if (pp.value[1] > 1) {
      pp.value[1] = pp.value[1] - 1
      pp.tag = true
      return pp
    } else return this.prevH(pp.value)
  }

  /* TaggedValue prevH( XGC_Array pList ) */
  prevH(pList) {
    const pp = new TaggedValue({ value: pList })
    let i
    const length = pp.value.length
    if (length > 1) {
      for (i = 2; i <= length && pp.value[i] == 1; i++);
      if (i <= length) {
        pp.value[i] = pp.value[i] - 1
        for (let j = 1; j < i; j++) pp.value[j] = pp.value[i]
        pp.tag = true
        return pp
      } else return pp
    } else return pp
  }

  /* TaggedValue nextV( XGC_Array pList, int max ) */
  nextV(pList, max) {
    var pp = new TaggedValue({ value: pList })
    var length = pp.value.length
    if ((length > 1 && pp.value[1] < pp.value[2]) || (length == 1 && pp.value[1] < max)) {
      pp.value[1] = pp.value[1] + 1
      pp.tag = true
      return pp
    } else return this.nextH(pp.value, max)
  }

  /* TaggedValue nextH( XGC_Array pList, int max ) */
  nextH(pList, max) {
    const pp = new TaggedValue({ value: pList })
    let i
    const length = pp.value.length
    if (length > 1) {
      for (i = 2; i < length && pp.value[i + 1] == pp.value[i]; i++);
      if (pp.value[i] < max) {
        pp.value[i] = pp.value[i] + 1
        for (let j = 1; j < i; j++) pp.value[j] = 1
        pp.tag = true
        return pp
      } else return pp
    } else return pp
  }

  /* boolean slowPart( int n ) */
  slowPart(n) {
    if (this.trace) console.log(`----- slowPart(${n}) -----`)
    const sourceList = this.values
    const sourceLen = sourceList.length
    const sourceMin = sourceList[1]
    const sourceMax = sourceList[sourceLen]

    let lastAddendum = 0
    let found

    if (this.trace) console.log("prevV")
    let pDownward = this.prevV(this.indices)
    let prevBefore = "prevV"
    let okDownward = pDownward.tag

    while (okDownward) {
      lastAddendum = n - sourceList.sumChoice(pDownward.value)
      found = sourceList.findIndex(lastAddendum)
      const tag = sourceList[found] === lastAddendum
      if (this.trace) console.log(String(pDownward.value.toArray()), "->", found, tag)
      if (tag) {
        this.indices = pDownward.value
        this.indices = List([found, ...this.indices.toArray()])
        return true
      }
      if (lastAddendum > sourceMax) {
        if (prevBefore === "prevH") {
          if (this.trace) console.log("no need to keep exploring downward")
          console.log("not found")
          return false
        }
        if (this.trace) console.log("prevH")
        pDownward = this.prevH(pDownward.value)
        prevBefore = "prevH"
      } else {
        if (this.trace) console.log("prevV")
        pDownward = this.prevV(pDownward.value)
        prevBefore = "prevV"
      }
      okDownward = pDownward.tag
    }

    if (this.trace) console.log("nextV")
    let pUpward = this.nextV(this.indices, sourceLen)
    let nextBefore = "nextV"
    let okUpward = pUpward.tag

    while (okUpward) {
      lastAddendum = n - sourceList.sumChoice(pUpward.value)
      found = sourceList.findIndex(lastAddendum)
      const tag = sourceList[found] === lastAddendum
      if (this.trace) console.log(String(pDownward.value.toArray()), "->", found, tag)
      if (tag) {
        this.indices = pUpward.value
        this.indices = List([found, ...this.indices.tArray()])
        return true
      }
      if (lastAddendum < sourceMin) {
        if (nextBefore === "nextH") {
          if (this.trace) console.log("no need to keep exploring upward")
          console.log("not found")
          return false
        }
        if (this.trace) console.log("nextH")
        pUpward = this.nextH(pUpward.value, sourceLen)
        nextBefore = "nextH"
      } else {
        if (this.trace) console.log("nextV")
        pUpward = this.nextV(pUpward.value, sourceLen)
        nextBefore = "nextV"
      }
      okUpward = pUpward.tag
    }

    if (this.trace) console.log("not found")
    return false
  }
}
