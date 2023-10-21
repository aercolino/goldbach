<template>
  <BaseSummary v-if="EuclidSet.length">
    <span
      >| { {{ e_0 }}, {{ e_1 }}, {{ e_2 }}, ..., {{ e_N }} } | =
      {{ store.multiples }}
      <BaseTooltip>
        Multiples of {{ store.selected.m }} that you should be able to write as the sum of
        {{ store.selected.m }} numbers of the <InfiniteEuclidSet />, if the
        {{ (store.selected.m === 2 && "GC") || "XGC" }} stands.
      </BaseTooltip></span
    >
  </BaseSummary>
</template>

<script setup>
import BaseSummary from "./BaseSummary.vue"
import BaseTooltip from "./BaseTooltip.vue"
import InfiniteEuclidSet from "./InfiniteEuclidSet.vue"
import { computed } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
const e_0 = computed(() => {
  if (!EuclidSet.value) return 0
  return store.selected.m * (EuclidSet.value.at(0) + 0)
})
const e_1 = computed(() => {
  if (!EuclidSet.value) return 0
  return store.selected.m * (EuclidSet.value.at(0) + 1)
})
const e_2 = computed(() => {
  if (!EuclidSet.value) return 0
  return store.selected.m * (EuclidSet.value.at(0) + 2)
})
const e_N = computed(() => {
  if (!EuclidSet.value) return 0
  return store.selected.m * EuclidSet.value.at(-1)
})
</script>
