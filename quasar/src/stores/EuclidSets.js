import { defineStore } from "pinia"
import { XGC_EuclidSet, XGC_Partition } from "src/maths/XGC.mjs"
import { arrayRange } from "src/utils.mjs"

const cmlToKey = ({ c, m, l }) => JSON.stringify([c, m, l])
const keyToCml = (key) => {
  const [c, m, l] = JSON.parse(key)
  return { c, m, l }
}
const computeEuclidSet = (c, m, l) => {
  const EuclidSet = new XGC_EuclidSet(c, m, l)
  return EuclidSet.values?.values ?? []
}
const computeFailuresSet = (c, m, l, EuclidSet) => {
  const multiples = arrayRange(EuclidSet.at(0) * m, EuclidSet.at(-1) * m, m)
  const partition = new XGC_Partition(new XGC_EuclidSet(c, m, l, EuclidSet))
  const failures = multiples.filter((n) => partition.get(n) === undefined)
  return failures
}

export const useEuclidSetsStore = defineStore("EuclidSets", {
  state: () => ({
    selected: { c: 0, m: 0, l: 0 },
    EuclidSets: {},
    FailuresSets: {},
  }),
  getters: {
    currentPosition(state) {
      const selectedKey = cmlToKey(state.selected)
      return Object.keys(state.EuclidSets).findIndex((key) => key === selectedKey)
    },
    firstPosition() {
      return 0
    },
    lastPosition(state) {
      return Object.keys(state.EuclidSets).length - 1
    },
    getEuclidSet:
      (state) =>
      ({ c, m, l }) => {
        const key = cmlToKey({ c, m, l })
        return [state.EuclidSets[key], state.FailuresSets[key]]
      },
    getSelected(state) {
      return this.getEuclidSet(state.selected)
    },
    multiples() {
      const [EuclidSet] = this.getSelected
      if (!EuclidSet) return 0
      return EuclidSet.at(-1) - EuclidSet.at(0) + 1
    },
    percentage() {
      const [, FailuresSet] = this.getSelected
      return ((FailuresSet.length / this.multiples) * 100).toFixed(1)
    },
  },
  actions: {
    selectPrevious() {
      if (this.currentPosition === this.firstPosition) return
      const newKey = Object.keys(this.EuclidSets)[this.currentPosition - 1]
      const { c, m, l } = keyToCml(newKey)
      this.setSelected({ c, m, l })
    },
    selectNext() {
      if (this.currentPosition === this.lastPosition) return
      const newKey = Object.keys(this.EuclidSets)[this.currentPosition + 1]
      const { c, m, l } = keyToCml(newKey)
      this.setSelected({ c, m, l })
    },
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
    },
  },
})
