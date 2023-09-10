<template>
  <div class="q-pa-md">
    <q-slider
      v-model="selectedModulus"
      style="width: 1000px"
      selection-color="transparent"
      :min="0"
      :max="100"
      :step="1"
      :inner-min="2"
      snap
      label-always
      markers
      :marker-labels="objMarkerLabels"
    />
    <q-slider
      v-model="selectedClass"
      style="width: 1000px"
      selection-color="transparent"
      :min="0"
      :max="100"
      :step="1"
      :inner-min="1"
      :inner-max="selectedModulus - 1"
      snap
      label-always
      switch-label-side
      markers
      :thumb-color="thumbColor"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { xgc_IsPrimeTo } from "../maths/XGC"
import { useEuclidSetsStore } from "stores/EuclidSets"

const arrayRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)

const EuclidSetsStore = useEuclidSetsStore()
EuclidSetsStore.setSelected(1, 2, 100)
const selectedClass = EuclidSetsStore.selectedClass
const selectedModulus = EuclidSetsStore.selectedModulus
const selectedLimit = EuclidSetsStore.selectedLimit

const labels = arrayRange(0, 100, 5)
const objMarkerLabels = Object.fromEntries(labels.map((x) => [x, x]))

const thumbColor = computed(() => {
  return xgc_IsPrimeTo(selectedClass, selectedModulus) ? "green" : "red"
})
</script>
