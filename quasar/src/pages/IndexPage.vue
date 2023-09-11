<template>
  <q-page class="flex flex-center">
    <BasicSelection />
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6"><EuclidSetName /></div>
          {{ selectedSet }}
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Multiples Range</div>
          <MultiplesRange />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Failing Multiples</div>
          {{ failingMultiples }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from "vue"
import BasicSelection from "../components/BasicSelection.vue"
import EuclidSetName from "../components/EuclidSetName.vue"
import MultiplesRange from "../components/MultiplesRange.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const selectedSet = computed(() => EuclidSetsStore.getSelected?.getValues() || [])
</script>
