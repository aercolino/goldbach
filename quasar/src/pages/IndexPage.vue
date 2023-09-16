<template>
  <q-page class="flex row content-start">
    <BasicSelection class="q-mt-lg" />
    <div class="q-pa-md fit row wrap justify-start items-start content-start">
      <q-card class="col-md-6">
        <q-card-section>
          <div class="text-body1">
            EuclidSet({{ EuclidSetsStore.selected.c }},{{ EuclidSetsStore.selected.m }})
            <sub>{{ EuclidSetsStore.selected.l }}</sub>
          </div>
          <CardinalityBadge :count="selectedSet?.length" />
          <q-badge class="q-ml-md" color="brown-6">{{ multiplesCount }} multiples</q-badge>
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 200px">
            {{ selectedSet }}
          </q-scroll-area>
        </q-card-section>
      </q-card>
      <q-card class="col-md-6">
        <q-card-section>
          <div class="row">
            <div class="col text-body1">Failing Multiples</div>
            <LimitPrompt class="col" />
          </div>
          <CardinalityBadge :count="failures.length" label="failures" />
          <q-badge class="q-ml-md" color="brown-6"
            >failures / multiples = {{ percentage }}%</q-badge
          >
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 200px">{{ failures }}</q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from "vue"
import BasicSelection from "../components/BasicSelection.vue"
import CardinalityBadge from "../components/CardinalityBadge.vue"
import LimitPrompt from "src/components/LimitPrompt.vue"

import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const selectedSet = computed(() => EuclidSetsStore.getSelected[0])
const failures = computed(() => EuclidSetsStore.getSelected[1])
const multiplesCount = computed(() => selectedSet.value?.at(-1) - selectedSet.value?.at(0) + 1)
const percentage = computed(() => ((failures.value.length / multiplesCount.value) * 100).toFixed(1))
</script>
