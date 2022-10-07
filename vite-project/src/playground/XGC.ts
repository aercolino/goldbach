/*
In the following javascript code I use these conventions:

  xgc_ or XGC_ are prefixes for globals
  xgc_something is a variable (begins lowercase)
  xgc_Something is a function (begins uppercase)
  XGC_Something is an object constructor
*/

/* to simplify maths we don't compute primes */
// you can change this string to meet your needs
import xgc_primes from './primes.json';

/* the following three variables absorb the primes string above */
const xgc_maxPrime = xgc_primes[xgc_primes.length - 1];
export const xgc_maxFactorable = xgc_maxPrime * xgc_maxPrime;

/* int xgc_GCD( int a, int b ) */
// gets the Greatest Common Divisor of a and b
function xgc_GCD( a: number, b: number ) {
  let remainder = 0;
  let max = Math.max( a, b );
  let min = Math.min( a, b );
  while (min > 0) {
    remainder = max % min;
    max = min;
    min = remainder;
  }
  return max;
}

/* boolean xgc_IsPrime( int p ) */
// true means that p is prime
// function xgc_IsPrime( p ) {
//   var factorList = xgc_Factorize( p );
//   if( factorList.pop() == p )
//     return true;
//   else return false;
// }

/* boolean xgc_IsPrimeTo( int a, int b ) */
// true means that the intersection between xgc_Factorize( a ) 
// and xgc_Factorize( b ) is empty
function xgc_IsPrimeTo( a: number, b: number ) {
  return xgc_GCD( a, b ) == 1;
}

/* boolean xgc_Divides( int divisor, int dividend ) */
// true means that divisor divides dividend
export function xgc_Divides( divisor, dividend ) {
  return ( dividend % divisor ) == 0;
}

/* Array xgc_Factorize( int n ) */
// undefined means n > xgc_maxFactorable
// gets the factors of n (without their multiplicities)
function xgc_Factorize( n: number ) {
  const s = [];
  if( n > xgc_maxFactorable ) // return empty Stack
    return undefined;
  
  const limit = Math.floor( Math.sqrt( n ) );
  for( let i = 0; xgc_primes[i] <= limit; i++ ) {
    if( xgc_Divides( xgc_primes[i], n ) ) {
      s.push( xgc_primes[i] );
      do {
        n /= xgc_primes[i];
      }
      while( xgc_Divides( xgc_primes[i], n ) );
    }
  }
  if( n > limit ) // n is prime
    s.push( n );
  return s;
}


/* Array makeArray( int len, int value ) */
function makeArray( len: number, value: number ) {
  if( len <= 0 ) len = 1;  //minimum length
  const array = new Array<number>( len );
  for( let i = 0; i < array.length; i++ ) array[i] = value;
  return array;
}

/* Array copyArray( Array source ) */
function copyArray( source: number[] ) {
  if( ! ( source instanceof Array ) ) return false;
  return source.concat();
}


/* constructor XGC_Array() */
function XGC_Array(...args) {
  //////////////////////////////////////////////////////////////////////////
  // object for an array of numbers that can transparently grow and shrink
  //
  // possible uses:
  // 0: new XGC_Array();
  //    allocate the array [0]
  // 1: new XGC_Array( number n );
  //    allocate an array with n elements, filled with 0s
  // 2: new XGC_Array( Array a );
  //    allocate a copy of a


  //////////////////////////////////////////////////////////////////////////
  // exported

  /* properties */
  this.values = makeArray( 1, 0 );  // the array

  /* methods */
  this.setLength = setLength;
  this.getAt = getAt;
  this.setAt = setAt;
  this.addHead = addHead;
  this.addTail = addTail;
  this.getChoice = getChoice;
  this.sumChoice = sumChoice;
  this.binSearch = binSearch;
  this.toString = toString;

  //////////////////////////////////////////////////////////////////////////
  // initialization

  switch( args.length ) {
  case 1:
    if( typeof( args[0] ) == "number" ) {
      const len = args[0];
      this.values = makeArray( len, 0 );
    } else if( args[0] instanceof Array ) {
      const array = args[0];
      this.values = copyArray( array );
    }
    break;
  }


  //////////////////////////////////////////////////////////////////////////
  // private

  /* number getAt( int index ) */
  // gets the value at index position
  // extends the array as needed (with 0s as initial values)
  function getAt( index ) {
    if (index > this.values.length) this.setLength( index );
    return this.values[index-1];
  }

  /* void setAt( int index, int value ) */
  // sets the value at index position
  // extends the array as needed (with 0s as initial values)
  function setAt( index, value ) {
    if (index > this.values.length) this.setLength( index );
    this.values[index-1] = value;
  }

  /* XGC_Array getChoice( XGC_Array selection ) */
  // gets these elements at selection positions as a new XGC_Array
  function getChoice( selection ) {
    const choice = new XGC_Array( selection.values.length );
    for( let i = 1; i <= selection.values.length; i++ ) {
      const value = this.getAt( selection.getAt( i ) );
      choice.setAt( i, value );
    }
    return choice;
  }

  /* int sumChoice( XGC_Array selection ) */
  // gets the sum of these elements at selection positions
  function sumChoice( selection ) {
    let sum = 0;
    for( let i = 1; i <= selection.values.length; i++ ) {
      sum += this.getAt( selection.getAt( i ) );
    }
    return sum;
  }

  /* void addHead( int value ) */
  // prepends value
  function addHead( value ) {
    this.values.unshift( value );
  }

  /* void addTail( int value ) */
  // appends value
  function addTail( value ) {
    this.values.push( value );
  }

  /* string toString() */
  // converts to string
  function toString() {
    return this.values instanceof Array ? "[" + this.values.join( ", " ) + "]" : this.values;
  }

  /* void setLength( int newLength ) */
  // grows or shrinks such that there are newLength elements
  // (with 0s as initial values when growing)
  function setLength( newLength ) {
    if( this.values.length < newLength ) {
      // grow
      this.values = this.values.concat( makeArray( newLength - this.values.length, 0 ) );
    } else {
      // shrink
      this.values = this.values.slice( 0, newLength );
    }
  }

  /* TaggedValue binSearch( int k ) */
  // { index, true } means that k is at index in values
  // { index, false } means that k is not in values, but
  //                  value at index is less than k, and
  //                  value at index + 1 is greater than k
  function binSearch( k ) {
    let low = 1;
    let high = this.values.length;
    let i = 0;
    while( high >= low ) {
      const mid = Math.floor( ( low + high ) / 2 );
      const n = this.getAt( mid );
      if( n == k ) {
        return {value: mid, tag: true};
      }
      else if( n > k ) {
        i = mid - 1;
        high = mid - 1;
      }
      else {
        i = mid;
        low = mid + 1;
      }
    }
    // to gain speed, we use an instant object like TaggedValue
    return {value: i, tag: false};
  }
}

/* constructor XGC_EuclidSet( int c, int m, int tMax ) */
export function XGC_EuclidSet( c, m, tMax ) {
  //////////////////////////////////////////////////////////////////////////
  // object for the Euclid Set of numbers
  // see THE_WEBSITE_URL for more information

  //////////////////////////////////////////////////////////////////////////
  // exported

  /* properties */
  this.residue = c;
  this.modulus = m;
  this.terms = tMax;
  this.values = undefined;

  //////////////////////////////////////////////////////////////////////////
  // initialization

  if( ( 0 < c ) && ( c < m ) && xgc_IsPrimeTo( c, m ) && ( tMax > 0 ) ) {
    const temp = [];
    const aeTrue = 0;
    const aeFalse = 1;
    const coprime = new XGC_Array( tMax );
    for( let t = 1; t <= tMax; t++ ) {
      if( coprime.getAt( t ) == aeTrue ) {
        const n = c + m * t;
        temp.push( n );
        const factorList = xgc_Factorize( n );
        while( factorList.length > 0 ) {
          const nextFactor = parseInt( factorList.pop(), 10 );
          for( let i = nextFactor + t; i <= tMax; i += nextFactor ) {
            coprime.setAt( i, aeFalse );
          }
        }
      }
    }
    this.values = new XGC_Array( temp );
  }
}

/* constructor TaggedValue() */
function TaggedValue(...args) {
  //////////////////////////////////////////////////////////////////////////
  // object for a value paired to a boolean
  //
  // possible uses:
  // 0: new TaggedValue();                      { null, false }
  // 1: new TaggedValue( boolean );             { null, boolean }
  // 2: new TaggedValue( notBoolean );          { notBoolean, false } *
  // 3: new TaggedValue( whatever, boolean );   { whatever, boolean } *
  //
  // *: if notBoolean (or whatever) is an Array or an XGC_Array
  //    then a new copy of it is put in TaggedValue.value
  //    else javascript rules apply

  
  //////////////////////////////////////////////////////////////////////////
  // exported

  /* properties */
  this.value = null;
  this.tag = false;

  //////////////////////////////////////////////////////////////////////////
  // initialization

  switch( args.length ) {
  case 1:
    if( typeof( args[0] ) == "boolean" ) {
      this.tag = args[0];
    } else {
      this.value = properValue( args[0] );
    }
    break;
  case 2:
    this.value = properValue( args[0] );
    this.tag = args[1];
    break;
  }

  //////////////////////////////////////////////////////////////////////////
  // private

  /* any properValue( any what ) */
  function properValue( what ) {
    if( what instanceof XGC_Array ) {
      return new XGC_Array( what.values );
    } else if( what instanceof Array ) {
      return copyArray( what );
    } else {
      return what;
    }
  }
}

/* constructor XGC_Partition( XGC_EuclidSet euclidSet ) */
export function XGC_Partition( euclidSet ) {
  //////////////////////////////////////////////////////////////////////////
  // object for the partition generator for the euclidSet
  // see THE_WEBSITE_URL for more information

  //////////////////////////////////////////////////////////////////////////
  // exported

  /* properties */
  this.euclidSet = euclidSet;     //reference to object XGC_EuclidSet
  this.pXGC = new XGC_Array();
  
  /* methods */
  this.get = get;
  this.fastPart = fastPart;
  this.slowPart = slowPart;

  //////////////////////////////////////////////////////////////////////////
  // private

  /* type get( int n ) */
  // type = false means n is not valid
  // type = undefined means a partition for n doesn't exist in euclidSet
  // type = XGC_Array means n = sum( XGC_Array )
  function get( n ) {
    const source = this.euclidSet.values;
    const sourceLen = source.values.length;
    const sourceMin = source.getAt( 1 );
    const sourceMax = source.getAt( sourceLen );

    if( xgc_Divides( this.euclidSet.modulus, n ) 
    && ( n >= this.euclidSet.modulus * sourceMin ) 
    && ( n <= this.euclidSet.modulus * sourceMax ) )
      if( this.fastPart( n ) || this.slowPart( n ) )
        return source.getChoice( this.pXGC );
      else return undefined;
    else return false;
  }

  /* boolean fastPart( int n ) */
  function fastPart( n ) {
    const source = this.euclidSet.values;
    // var sourceLen = source.values.length;
    const sourceMin = source.getAt( 1 );
    // var sourceMax = source.getAt( sourceLen );

    let lastAddendum = n;
    let found;
    const oneLess = this.euclidSet.modulus - 1;
    this.pXGC = new XGC_Array( oneLess );
    for( let i = oneLess; i > 0; i-- ) {
        found = source.binSearch( lastAddendum - i * sourceMin );
        this.pXGC.setAt( i, found.value );
        lastAddendum -= source.getAt( found.value );
    }
    found = source.binSearch( lastAddendum );
    if( found.tag ) this.pXGC.addHead( found.value );
    return found.tag;
  }

  /* TaggedValue prevV( XGC_Array p ) */
  function prevV( p ) {
    const pp = new TaggedValue( p );
    if( pp.value.getAt( 1 ) > 1 ) {
      pp.value.setAt( 1, pp.value.getAt( 1 ) - 1 );
      pp.tag = true;
      return pp;
    }
    else return prevH( p );
  }

  /* TaggedValue prevH( XGC_Array p ) */
  function prevH( p ) {
    const pp = new TaggedValue( p );
    let i;
    const length = p.values.length;
    if( length > 1 ) {
      for( i = 2; i <= length && p.getAt( i ) == 1; i++ );
      if( i <= length ) {
        pp.value.setAt( i, pp.value.getAt( i ) - 1 );
        for( let j = 1; j < i; j++ )
          pp.value.setAt( j, pp.value.getAt( i ) );
        pp.tag = true;
        return pp;
      }
      else return pp;
    }
    else return pp;
    }

  /* TaggedValue nextV( XGC_Array p, int max ) */
  function nextV( p, max ) {
    const pp = new TaggedValue( p );
    const length = p.values.length;
    if( length > 1 && p.getAt( 1 ) < p.getAt( 2 ) 
    || length == 1 && p.getAt( 1 ) < max ) {
      pp.value.setAt( 1, pp.value.getAt( 1 ) + 1 );
      pp.tag = true;
      return pp;
    }
    else return nextH( p, max );
  }

  /* TaggedValue nextH( XGC_Array p, int max ) */
  function nextH( p, max ) {
    const pp = new TaggedValue( p );
    let i;
    const length = p.values.length;
    if( length > 1 ) {
      for( i = 2; i < length && p.getAt( i + 1 ) == p.getAt( i ); i++ );
      if( p.getAt( i ) < max ) {
        pp.value.setAt( i, pp.value.getAt( i ) + 1 );
        for( let j = 1; j < i; j++ )
          pp.value.setAt( j, 1 );
        pp.tag = true;
        return pp;
      }
      else return pp;
    }
    else return pp;
  }

  /* boolean slowPart( int n ) */
  function slowPart( n ) {
    const source = this.euclidSet.values;
    const sourceLen = source.values.length;
    const sourceMin = source.getAt( 1 );
    const sourceMax = source.getAt( sourceLen );

    let lastAddendum = 0;
    let found;

    let pDownward = prevV( this.pXGC );
    let okDownward = pDownward.tag;

    let pUpward = nextV( this.pXGC, sourceLen );
    let okUpward = pUpward.tag;

    while( okDownward || okUpward ) {

      if( okDownward ) {
        lastAddendum = n - source.sumChoice( pDownward.value );
        found = source.binSearch( lastAddendum );
        if( found.tag ) {
          this.pXGC = pDownward.value;
          this.pXGC.addHead( found.value );
          return true;
        }
        if( lastAddendum > sourceMax ) {
          pDownward = prevH( pDownward.value );
        } else {
          pDownward = prevV( pDownward.value );
        }
        okDownward = pDownward.tag;
      }

      if( okUpward ) {
        lastAddendum = n - source.sumChoice( pUpward.value );
        found = source.binSearch( lastAddendum );
        if( found.tag ) {
          this.pXGC = pUpward.value;
          this.pXGC.addHead( found.value );
          return true;
        }
        if( lastAddendum < sourceMin ) {
          pUpward = nextH( pUpward.value, sourceLen );
        } else {
          pUpward = nextV( pUpward.value, sourceLen );
        }
        okUpward = pUpward.tag;
      }

    }
    return false;
  }

}

