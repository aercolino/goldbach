<template>
  <q-page class="flex row content-start">
    <BasicSelection class="q-mt-lg" />
    <div class="q-pa-md fit row wrap justify-start items-start content-start">
      <q-card class="col-md-6">
        <q-card-section>
          <div class="text-body1">
            EuclidSet({{ EuclidSetsStore.selected.c }}, {{ EuclidSetsStore.selected.m }})<sub>{{
              EuclidSetsStore.selected.l
            }}</sub
            ><CardinalityBadge :count="selectedSet?.length" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 200px; max-width: 300px">
            {{ selectedSet }}
          </q-scroll-area>
        </q-card-section>
      </q-card>
      <q-card class="col-md-6">
        <q-card-section>
          <div class="text-body1">
            Failing Multiples <LimitPrompt /><CardinalityBadge :count="failures.length" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 200px; max-width: 300px">{{ failures }}</q-scroll-area>
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
</script>
