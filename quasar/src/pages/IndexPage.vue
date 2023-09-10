<template>
  <q-page class="flex flex-center">
    <BasicSelection></BasicSelection>
  </q-page>
  {{ selectedSet }}
</template>

<script setup>
import BasicSelection from "../components/BasicSelection.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const selectedSet = EuclidSetsStore.getSelected
</script>
