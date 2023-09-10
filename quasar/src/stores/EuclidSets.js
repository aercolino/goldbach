import { defineStore } from "pinia"
import { XGC_EuclidSet } from "src/maths/XGC"

const cmlToKey = ({ c, m, l }) => JSON.stringify([c, m, l])

export const useEuclidSetsStore = defineStore("EuclidSets", {
  state: () => ({
    selected: { c: 0, m: 0, l: 0 },
    sets: {}
  }),
  getters: {
    getEuclidSet:
      (state) =>
      ({ c, m, l }) =>
        state.sets[cmlToKey({ c, m, l })],
    getSelected(state) {
      return this.getEuclidSet(state.selected)
    }
  },
  actions: {
    setEuclidSet({ c, m, l }) {
      this.sets[cmlToKey({ c, m, l })] = new XGC_EuclidSet(c, m, l)
    },
    setSelected({ c, m, l }) {
      this.selected = { c, m, l }
      if (!this.getSelected) {
        this.setEuclidSet({ c, m, l })
      }
    }
  }
})
