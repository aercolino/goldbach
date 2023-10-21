<template>
  <div class="col text-body1">
    <span
      >{{ (store.selected.m === 2 && "GC") || "XGC" }} finitude failures
      <BaseTooltip>
        Multiples of {{ store.selected.m }} that you are not able to write as the sum of
        {{ store.selected.m }} numbers of the <FiniteEuclidSet /> </BaseTooltip
    ></span>
  </div>
</template>

<script setup>
import BaseTooltip from "./BaseTooltip.vue"
import FiniteEuclidSet from "./FiniteEuclidSet.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
