<template>
  <q-page class="flex flex-center">
    <BasicSelection></BasicSelection>
  </q-page>
  <div class="q-pa-md">
    {{ EuclidSetsStore.getSelected?.getValues() }}
  </div>
</template>

<script setup>
import BasicSelection from "../components/BasicSelection.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
</script>
