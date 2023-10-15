export function List(arg) {
  let data
  let methods
  let methodsNames
  initialize(arg)

  return new Proxy(data, {
    get(target, prop, receiver) {
      if (typeof prop === "symbol") {
        return Reflect.get(target, prop, receiver)
      }
      if (prop === "isList") {
        return true
      }
      const { value: index, isNumber } = toNumber(prop)
      if (isNumber && (index < 1 || target.length < index)) return undefined
      if (isNumber) {
        return getData(index)
      }
      if (methodsNames.includes(prop)) {
        return methods[prop]
      }
      if (typeof Array.prototype[prop] === "function") {
        // To simplify, we just pass through all Array methods down to the target
        // array, even if some of them are 0 based
        return target[prop].bind(target)
      }
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      const { value: index, isNumber } = toNumber(prop)
      if (isNumber && (index < 1 || target.length < index))
        throw new Error(`Expected an existing index. Got "${index}".`)
      if (isNumber) {
        return setData(index, value)
      }
      return Reflect.set(target, prop, value, receiver)
    },
  })

  function getData(index) {
    return data[index - 1]
  }

  function setData(index, value) {
    data[index - 1] = value
    return true
  }

  function toNumber(x) {
    const number = parseInt(x, 10)
    return {
      isNumber: !Number.isNaN(number),
      value: number,
    }
  }

  function initData(arg) {
    if (!arg) {
      data = []
    } else if (Array.isArray(arg)) {
      data = arg.slice()
    }
    if (data) return

    const { value, isNumber } = toNumber(arg)
    if (isNumber && value < 0)
      throw new Error(`Expected a length argument. Got "${JSON.stringify(arg)}".`)

    if (isNumber) {
      data = new Array(arg).fill(0)
    } else if (arg.isList) {
      data = arg.toArray()
    } else throw new Error(`Expected a numerical or list argument. Got "${JSON.stringify(arg)}".`)
  }

  function initMethods() {
    methods = {
      toArray() {
        return data.slice()
      },
      toJSON() {
        return data
      },
      pick(selection) {
        return List(selection.map((x) => getData(x)))
      },
      sumChoice(selection) {
        return selection.reduce((acc, x) => (acc += getData(x)), 0)
      },
      findIndex(value) {
        let lowIndex = 1
        let highIndex = data.length
        let foundIndex = 0
        let notFoundIndex = 0
        while (lowIndex <= highIndex) {
          foundIndex = Math.floor((lowIndex + highIndex) / 2)
          const middleValue = getData(foundIndex)
          if (middleValue === value) {
            return foundIndex
          } else if (middleValue > value) {
            notFoundIndex = foundIndex - 1
            highIndex = foundIndex - 1
          } else {
            notFoundIndex = foundIndex
            lowIndex = foundIndex + 1
          }
        }
        // getData(notFoundIndex) < value < getData(notFoundIndex + 1)
        return notFoundIndex
      },
    }
    methodsNames = Object.keys(methods)
  }

  function initialize(arg) {
    initData(arg)
    initMethods()
  }
}
