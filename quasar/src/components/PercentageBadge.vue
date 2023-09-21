<template>
  <q-badge v-if="xgc_IsPrimeTo(store.selected.c, store.selected.m)" class="q-ml-md" color="brown-6"
    >{{ store.percentage }} %
    <q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]"
      >failures / multiples</q-tooltip
    ></q-badge
  >
</template>

<script setup>
import { xgc_IsPrimeTo } from "../maths/XGC"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
