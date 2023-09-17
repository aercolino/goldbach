<template>
  <q-badge class="q-ml-md" color="brown-6">{{ EuclidSetsStore.multiples }} multiples</q-badge>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
