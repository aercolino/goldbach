<template>
  <div class="col text-body1">
    {{ (store.selected.m === 2 && "Goldbach Conjecture") || "Extended Goldbach Conjecture" }}
    failures
  </div>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
