<template>
  <q-badge v-if="xgc_IsPrimeTo(store.selected.c, store.selected.m)" class="q-ml-md" color="brown-6"
    >{{ store.multiples }} multiples
    <q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]" style="width: 200px"
      >Biggest number of multiples of {{ store.selected.m }} that can be written as the sum of
      {{ store.selected.m }} numbers of the current EuclidSet, from {{ store.selected.m * min }} to
      {{ store.selected.m * max }}.</q-tooltip
    >
  </q-badge>
</template>

<script setup>
import { computed } from "vue"
import { xgc_IsPrimeTo } from "../maths/XGC"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
const min = computed(() => (EuclidSet.value && EuclidSet.value.at(0)) || 0)
const max = computed(() => (EuclidSet.value && EuclidSet.value.at(-1)) || 0)
</script>
