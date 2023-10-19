/* to simplify maths we don't compute primes */
// you can change this string to meet your needs
import primesList from "./primes.mjs"

/* the following three variables absorb the primes string above */
export const primes = primesList.sort((a, b) => a - b)
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
//   if (factorList.pop() === p) return true;
//   else return false;
// }

/* boolean isPrimeTo( int a, int b ) */
// true means that the intersection between factorize( a )
// and factorize( b ) is empty
export function isPrimeTo(a, b) {
  return GCD(a, b) === 1
}

/* boolean divides( int divisor, int dividend ) */
// true means that divisor divides dividend
export function divides(divisor, dividend) {
  return dividend % divisor === 0
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
