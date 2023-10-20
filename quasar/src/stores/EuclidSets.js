import { defineStore } from "pinia"
import { List } from "src/maths/List.mjs"
import { XGC_EuclidSet, XGC_Partition } from "src/maths/XGC.mjs"
import { arrayRange } from "src/utils.mjs"

const cmlToKey = ({ c, m, l }) => JSON.stringify([c, m, l])
const keyToCml = (key) => {
  const [c, m, l] = JSON.parse(key)
  return { c, m, l }
}
const computeEuclidSetArray = async (c, m, l) => {
  const EuclidSet = new XGC_EuclidSet(c, m)
  const list = await EuclidSet.find(l)
  return list.toArray()
}
const computeFailuresSet = async (c, m, l, EuclidSetArray) => {
  if (EuclidSetArray.length === 0) return
  const multiples = arrayRange(EuclidSetArray.at(0) * m, EuclidSetArray.at(-1) * m, m)
  const EuclidSet = new XGC_EuclidSet(c, m)
  const partition = new XGC_Partition(EuclidSet, List(EuclidSetArray))
  const proofs = await Promise.all(multiples.map((n) => partition.find(n)))
  console.log(
    "proofs",
    proofs.map((p) => ({ ...p, proof: JSON.stringify(p.proof) })),
  )
  const count = proofs.reduce(
    (acc, val) => {
      if (val.method === undefined) return acc
      if (val.method === "fast") acc.fast += 1
      if (val.method === "slow") acc.slow += 1
      return acc
    },
    { fast: 0, slow: 0 },
  )
  console.log("count", count)
  const failures = proofs.filter((p) => p.proof === undefined).map((p) => p.n)
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
      const [EuclidSetArray] = this.getSelected
      if (!EuclidSetArray) return 0
      return EuclidSetArray.at(-1) - EuclidSetArray.at(0) + 1
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
    async setEuclidSet({ c, m, l }) {
      const key = cmlToKey({ c, m, l })
      this.EuclidSets[key] = await computeEuclidSetArray(c, m, l)
      this.FailuresSets[key] = await computeFailuresSet(c, m, l, this.EuclidSets[key])
    },
    setSelected({ c, m, l }) {
      this.selected = { c, m, l }
      if (!this.getSelected[0]) {
        this.setEuclidSet({ c, m, l })
      }
    },
  },
})
