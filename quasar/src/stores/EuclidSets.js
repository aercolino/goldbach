import { defineStore } from "pinia"
import { XGC_EuclidSet } from "src/maths/XGC"

export const useEuclidSetsStore = defineStore("EuclidSets", {
  state: () => ({
    selectedClass: 0,
    selectedModulus: 0,
    selectedLimit: 0,
    sets: new Map()
  }),
  getters: {
    getEuclidSet: (state) => (c, m, l) => state.sets.get([c, m, l]),
    getSelected(state) {
      return this.getEuclidSet(state.selectedClass, state.selectedModulus, state.selectedLimit)
    }
  },
  actions: {
    setEuclidSet(c, m, l) {
      this.sets.set([c, m, l], new XGC_EuclidSet(c, m, l))
    },
    setSelected(c, m, l) {
      this.selectedClass = c
      this.selectedModulus = m
      this.selectedLimit = l
      if (!this.getSelected) {
        this.setEuclidSet(c, m, l)
      }
    }
  }
})
