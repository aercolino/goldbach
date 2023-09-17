<template>
  <div class="q-pa-md">
    <q-slider
      v-model="store.selected.m"
      style="width: 1000px"
      selection-color="transparent"
      :min="0"
      :max="100"
      :step="1"
      :inner-min="2"
      snap
      label-always
      markers
      thumb-color="purple"
      :marker-labels="objMarkerLabels"
      @change="
        (value) =>
          value === 2
            ? store.setSelected({
                ...store.selected,
                m: 2,
                c: 1
              })
            : store.setSelected({
                ...store.selected,
                m: value
              })
      "
    />
    <q-slider
      v-model="store.selected.c"
      style="width: 1000px"
      selection-color="transparent"
      :min="0"
      :max="100"
      :step="1"
      :inner-min="1"
      :inner-max="store.selected.m - 1"
      snap
      label-always
      switch-label-side
      markers
      :thumb-color="thumbColor"
      @change="
        (value) =>
          store.setSelected({
            ...store.selected,
            c: value
          })
      "
    />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { xgc_IsPrimeTo } from "../maths/XGC"
import { useEuclidSetsStore } from "stores/EuclidSets"
import { arrayRange } from "src/utils"

const store = useEuclidSetsStore()
store.setSelected({ c: 1, m: 2, l: 150 })

const labels = arrayRange(0, 100, 5)
const objMarkerLabels = Object.fromEntries(labels.map((x) => [x, x]))

const thumbColor = computed(() => {
  return xgc_IsPrimeTo(store.selected.c, store.selected.m) ? "green" : "red"
})
</script>
