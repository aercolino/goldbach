<template>
  <div class="q-pa-md">
    <q-slider
      v-model="EuclidSetsStore.selected.m"
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
      @change="
        (value) =>
          EuclidSetsStore.setSelected({
            ...EuclidSetsStore.selected,
            m: value
          })
      "
    />
    <q-slider
      v-model="EuclidSetsStore.selected.c"
      style="width: 1000px"
      selection-color="transparent"
      :min="0"
      :max="100"
      :step="1"
      :inner-min="1"
      :inner-max="EuclidSetsStore.selected.m - 1"
      snap
      label-always
      switch-label-side
      markers
      :thumb-color="thumbColor"
      @change="
        (value) =>
          EuclidSetsStore.setSelected({
            ...EuclidSetsStore.selected,
            c: value
          })
      "
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
EuclidSetsStore.setSelected({ c: 1, m: 2, l: 150 })

const labels = arrayRange(0, 100, 5)
const objMarkerLabels = Object.fromEntries(labels.map((x) => [x, x]))

const thumbColor = computed(() => {
  return xgc_IsPrimeTo(EuclidSetsStore.selected.c, EuclidSetsStore.selected.m) ? "green" : "red"
})
</script>
