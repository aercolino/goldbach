import { defineStore } from "pinia"
import { XGC_EuclidSet, XGC_Partition } from "src/maths/XGC"
import { arrayRange } from "src/utils.mjs"

const cmlToKey = ({ c, m, l }) => JSON.stringify([c, m, l])

const computeEuclidSet = (c, m, l) => {
  const EuclidSet = new XGC_EuclidSet(c, m, l)
  return EuclidSet.values?.values ?? []
}
const computeFailuresSet = (c, m, l, EuclidSet) => {
  const multiples = arrayRange(EuclidSet.at(0) * m, EuclidSet.at(-1) * m, m)
  const partition = new XGC_Partition(new XGC_EuclidSet(c, m, l, EuclidSet))
  const failures = multiples.filter((n) => partition.get(n) === undefined)
  console.log(
    "failures / multiples =",
    ((failures.length / multiples.length) * 100).toFixed(0),
    "%"
  )
  return failures
}

export const useEuclidSetsStore = defineStore("EuclidSets", {
  state: () => ({
    selected: { c: 0, m: 0, l: 0 },
    EuclidSets: {},
    FailuresSets: {}
  }),
  getters: {
    getEuclidSet:
      (state) =>
      ({ c, m, l }) => {
        const key = cmlToKey({ c, m, l })
        return [state.EuclidSets[key], state.FailuresSets[key]]
      },
    getSelected(state) {
      return this.getEuclidSet(state.selected)
    }
  },
  actions: {
    setEuclidSet({ c, m, l }) {
      const key = cmlToKey({ c, m, l })
      this.EuclidSets[key] = computeEuclidSet(c, m, l)
      this.FailuresSets[key] = computeFailuresSet(c, m, l, this.EuclidSets[key])
    },
    setSelected({ c, m, l }) {
      this.selected = { c, m, l }
      if (!this.getSelected[0]) {
        this.setEuclidSet({ c, m, l })
      }
    }
  }
})
