<template>
  <q-page class="flex row content-start">
    <BasicSelection class="q-mt-lg" />
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6"><EuclidSetName /></div>
          {{ selectedSet }} <CardinalityBadge :count="selectedSet?.length" />
        </q-card-section>
        <q-card-section v-if="isNonEmptySet">
          <div class="text-h6">Multiples of {{ EuclidSetsStore.selected.m }}</div>
          <MultiplesRange />
        </q-card-section>
        <q-card-section v-if="isNonEmptySet">
          <div class="text-h6">Failing Multiples</div>
          <FailingMultiples />
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
import FailingMultiples from "../components/FailingMultiples.vue"
import CardinalityBadge from "../components/CardinalityBadge.vue"

import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const selectedSet = computed(() => EuclidSetsStore.getSelected[0])
const isNonEmptySet = computed(() => !!selectedSet.value?.length)
</script>
