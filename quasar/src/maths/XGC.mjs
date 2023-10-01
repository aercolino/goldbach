/* to simplify maths we don't compute primes */
// you can change this string to meet your needs
import primesList from "./primes.mjs"

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

export class XGC_Array {
  /* constructor XGC_Array() */
  constructor(lengthOrList) {
    this.values = makeArray(1, 0) // the array
    if (!lengthOrList) return

    if (Array.isArray(lengthOrList)) {
      this.values = copyArray(lengthOrList)
    } else if (/^\d+$/.test(String(lengthOrList))) {
      this.values = makeArray(lengthOrList, 0)
    } else {
      throw new Error(
        `Expected either nothing, an integer, or an array. Got ${JSON.stringify(lengthOrList)}`,
      )
    }
  }

  /* number getAt( int index ) */
  // gets the value at index position
  // extends the array as needed (with 0s as initial values)
  getAt(index) {
    if (index < 1)
      throw new Error(`Expected index to be grater than 0. Got "${JSON.stringify(index)}"`)
    if (index > this.values.length) this.setLength(index)
    return this.values[index - 1]
  }

  /* void setAt( int index, int value ) */
  // sets the value at index position
  // extends the array as needed (with 0s as initial values)
  setAt(index, value) {
    if (index < 1)
      throw new Error(`Expected index to be grater than 0. Got "${JSON.stringify(index)}"`)
    if (index > this.values.length) this.setLength(index)
    this.values[index - 1] = value
  }

  /* XGC_Array getChoice( XGC_Array selection ) */
  // gets these elements at selection positions as a new XGC_Array
  getChoice(selection) {
    const issues = selection.values.filter((x) => x < 1 || x > this.values.length)
    if (issues.length > 0)
      throw new Error(
        `Expected a selection from 1 to ${this.values.length}. Got "${JSON.stringify(issues)}"`,
      )
    const choice = new XGC_Array(selection.values.length)
    for (let i = 1; i <= selection.values.length; i++) {
      const value = this.getAt(selection.getAt(i))
      choice.setAt(i, value)
    }
    return choice
  }

  /* int sumChoice( XGC_Array selection ) */
  // gets the sum of these elements at selection positions
  sumChoice(selection) {
    let sum = 0
    for (let i = 1; i <= selection.values.length; i++) {
      sum += this.getAt(selection.getAt(i))
    }
    return sum
  }

  /* void addHead( int value ) */
  // prepends value
  addHead(value) {
    this.values.unshift(value)
  }

  /* void addTail( int value ) */
  // appends value
  addTail(value) {
    this.values.push(value)
  }

  /* void setLength( int newLength ) */
  // grows or shrinks such that there are newLength elements
  // (with 0s as initial values when growing)
  setLength(newLength) {
    if (this.values.length < newLength) {
      // grow
      this.values = this.values.concat(makeArray(newLength - this.values.length, 0))
    } else {
      // shrink
      this.values = this.values.slice(0, newLength)
    }
  }

  /* TaggedValue binSearch( int k ) */
  // { index, true } means that k is at index in values
  // { index, false } means that k is not in values, but
  //                  value at index is less than k, and
  //                  value at index + 1 is greater than k
  binSearch(k) {
    let low = 1
    let high = this.values.length
    let i = 0
    while (high >= low) {
      const mid = Math.floor((low + high) / 2)
      const n = this.getAt(mid)
      if (n == k) {
        return { value: mid, tag: true }
      } else if (n > k) {
        i = mid - 1
        high = mid - 1
      } else {
        i = mid
        low = mid + 1
      }
    }
    return new TaggedValue({ value: i, tag: false })
  }
}

export class XGC_EuclidSet {
  constructor(c, m, tMax, values) {
    if (tMax <= 0) throw new Error(`Expected a positive limit. Got "${JSON.stringify(tMax)}"`)
    if (!(0 < c && c < m)) throw new Error(`Expected ${c}, ${m} such that 0 < ${c} < ${m}.`)
    this.residue = c
    this.modulus = m
    this.terms = tMax
    this.values = new XGC_Array([])
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
      this.values = new XGC_Array(values)
      return
    }

    const temp = []
    const aeTrue = 0
    const aeFalse = 1
    const coprime = new XGC_Array(tMax)
    for (let t = 1; t <= tMax; t++) {
      if (coprime.getAt(t) == aeTrue) {
        const n = c + m * t
        temp.push(n)
        const factorList = factorize(n)
        while (factorList.length > 0) {
          const nextFactor = parseInt(factorList.pop(), 10)
          for (let i = nextFactor + t; i <= tMax; i += nextFactor) {
            coprime.setAt(i, aeFalse)
          }
        }
      }
    }
    this.values = new XGC_Array(temp)
  }
}

export class TaggedValue {
  constructor({ value, tag } = { value: null, tag: false }) {
    this.value = value ? this.properValue(value) : null
    this.tag = tag ?? false
  }

  properValue(what) {
    if (what instanceof XGC_Array) {
      return new XGC_Array(what.values)
    } else if (what instanceof Array) {
      return copyArray(what)
    } else {
      return what
    }
  }
}

export class PartitionFinder {
  /* constructor PartitionFinder( XGC_EuclidSet euclidSet ) */
  constructor(euclidSet) {
    this.euclidSet = euclidSet //reference to object XGC_EuclidSet
    this.pXGC = new XGC_Array()
    this.trace = false
  }

  /* type get( int n ) */
  // type = false means n is not valid
  // type = undefined means a partition for n doesn't exist in euclidSet
  // type = XGC_Array means n = sum( XGC_Array )
  get(n) {
    const source = this.euclidSet.values
    const sourceLen = source.values.length
    const sourceMin = source.getAt(1)
    const sourceMax = source.getAt(sourceLen)

    if (
      divides(this.euclidSet.modulus, n) &&
      n >= this.euclidSet.modulus * sourceMin &&
      n <= this.euclidSet.modulus * sourceMax
    )
      if (this.fastPart(n))
        return {
          n,
          method: "fast",
          proof: source.getChoice(this.pXGC),
        }
      else if (this.slowPart(n))
        return {
          n,
          method: "slow",
          proof: source.getChoice(this.pXGC),
        }
      else return undefined
    else return false
  }

  /* boolean fastPart( int n ) */
  fastPart(n) {
    if (this.trace) console.log(`----- fastPart(${n}) -----`)
    const source = this.euclidSet.values
    const sourceMin = source.getAt(1)

    let lastAddendum = n
    let found
    const oneLess = this.euclidSet.modulus - 1
    this.pXGC = new XGC_Array(oneLess)
    for (let i = oneLess; i > 0; i--) {
      found = source.binSearch(lastAddendum - i * sourceMin)
      this.pXGC.setAt(i, found.value)
      lastAddendum -= source.getAt(found.value)
    }
    found = source.binSearch(lastAddendum)
    if (this.trace) console.log(String(this.pXGC.values), "->", found.value, found.tag)
    if (found.tag) {
      this.pXGC.addHead(found.value)
      return true
    }
    return false
  }

  /* TaggedValue prevV( XGC_Array p ) */
  prevV(p) {
    const pp = new TaggedValue({ value: p })
    if (pp.value.getAt(1) > 1) {
      pp.value.setAt(1, pp.value.getAt(1) - 1)
      pp.tag = true
      return pp
    } else return this.prevH(p)
  }

  /* TaggedValue prevH( XGC_Array p ) */
  prevH(p) {
    const pp = new TaggedValue({ value: p })
    let i
    const length = p.values.length
    if (length > 1) {
      for (i = 2; i <= length && p.getAt(i) == 1; i++);
      if (i <= length) {
        pp.value.setAt(i, pp.value.getAt(i) - 1)
        for (let j = 1; j < i; j++) pp.value.setAt(j, pp.value.getAt(i))
        pp.tag = true
        return pp
      } else return pp
    } else return pp
  }

  /* TaggedValue nextV( XGC_Array p, int max ) */
  nextV(p, max) {
    var pp = new TaggedValue({ value: p })
    var length = p.values.length
    if ((length > 1 && p.getAt(1) < p.getAt(2)) || (length == 1 && p.getAt(1) < max)) {
      pp.value.setAt(1, pp.value.getAt(1) + 1)
      pp.tag = true
      return pp
    } else return this.nextH(p, max)
  }

  /* TaggedValue nextH( XGC_Array p, int max ) */
  nextH(p, max) {
    const pp = new TaggedValue({ value: p })
    let i
    const length = p.values.length
    if (length > 1) {
      for (i = 2; i < length && p.getAt(i + 1) == p.getAt(i); i++);
      if (p.getAt(i) < max) {
        pp.value.setAt(i, pp.value.getAt(i) + 1)
        for (let j = 1; j < i; j++) pp.value.setAt(j, 1)
        pp.tag = true
        return pp
      } else return pp
    } else return pp
  }

  /* boolean slowPart( int n ) */
  slowPart(n) {
    if (this.trace) console.log(`----- slowPart(${n}) -----`)
    const source = this.euclidSet.values
    const sourceLen = source.values.length
    const sourceMin = source.getAt(1)
    const sourceMax = source.getAt(sourceLen)

    let lastAddendum = 0
    let found

    if (this.trace) console.log("prevV")
    let pDownward = this.prevV(this.pXGC)
    let prevBefore = "prevV"
    let okDownward = pDownward.tag

    while (okDownward) {
      lastAddendum = n - source.sumChoice(pDownward.value)
      found = source.binSearch(lastAddendum)
      if (this.trace) console.log(String(pDownward.value.values), "->", found.value, found.tag)
      if (found.tag) {
        this.pXGC = pDownward.value
        this.pXGC.addHead(found.value)
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
    let pUpward = this.nextV(this.pXGC, sourceLen)
    let nextBefore = "nextV"
    let okUpward = pUpward.tag

    while (okUpward) {
      lastAddendum = n - source.sumChoice(pUpward.value)
      found = source.binSearch(lastAddendum)
      if (this.trace) console.log(String(pDownward.value.values), "->", found.value, found.tag)
      if (found.tag) {
        this.pXGC = pUpward.value
        this.pXGC.addHead(found.value)
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
