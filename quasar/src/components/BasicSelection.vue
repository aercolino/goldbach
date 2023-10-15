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
      :label-value="labelM"
      snap
      label-always
      markers
      thumb-color="purple"
      :marker-labels="objMarkerLabels"
      @change="
        (m) =>
          store.setSelected({
            ...store.selected,
            m,
            c: store.selected.c >= m ? m - 1 : store.selected.c,
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
      :label-value="labelC"
      snap
      label-always
      switch-label-side
      markers
      :thumb-color="thumbColor"
      @change="
        (c) =>
          store.setSelected({
            ...store.selected,
            c,
          })
      "
    />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { isPrimeTo, factorize } from "../maths/XGC"
import { useEuclidSetsStore } from "stores/EuclidSets"
import { arrayRange } from "src/utils"

const store = useEuclidSetsStore()
store.setSelected({ c: 1, m: 2, l: 150 })

const labels = arrayRange(0, 100, 5)
const objMarkerLabels = Object.fromEntries(labels.map((x) => [x, x]))

const thumbColor = computed(() => {
  return isPrimeTo(store.selected.c, store.selected.m) ? "green" : "red"
})

const labelFactors = (value) => {
  const factorSeparator = ","
  const classSeparator = " ~"
  const factors = factorize(value).join(factorSeparator)
  return factors ? `${value}${classSeparator}${factors}` : value
}
const labelC = computed(() => labelFactors(store.selected.c))
const labelM = computed(() => labelFactors(store.selected.m))
</script>
