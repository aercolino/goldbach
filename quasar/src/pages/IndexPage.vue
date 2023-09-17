<template>
  <q-page class="flex row content-start">
    <BasicSelection class="q-mt-lg" />
    <div class="q-pa-md fit row wrap justify-start items-start content-start">
      <q-card class="col-md-6">
        <q-card-section>
          <div class="row">
            <EuclidSetTitle />
            <NavigationButtons />
          </div>
          <ElementsBadge />
          <MultiplesBadge />
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 200px">
            {{ EuclidSet }}
          </q-scroll-area>
        </q-card-section>
      </q-card>
      <q-card v-if="Array.isArray(FailuresSet)" class="col-md-6">
        <q-card-section>
          <div class="row">
            <div class="col text-body1">Failing Multiples</div>
            <LimitPrompt />
          </div>
          <FailuresBadge />
          <PercentageBadge />
        </q-card-section>
        <q-card-section>
          <q-scroll-area style="height: 200px">{{ FailuresSet }}</q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from "vue"
import BasicSelection from "../components/BasicSelection.vue"
import EuclidSetTitle from "../components/EuclidSetTitle.vue"
import ElementsBadge from "src/components/ElementsBadge.vue"
import FailuresBadge from "src/components/FailuresBadge.vue"
import MultiplesBadge from "../components/MultiplesBadge.vue"
import LimitPrompt from "src/components/LimitPrompt.vue"
import NavigationButtons from "../components/NavigationButtons.vue"
import PercentageBadge from "../components/PercentageBadge.vue"

import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const EuclidSet = computed(() => EuclidSetsStore.getSelected[0])
const FailuresSet = computed(() => EuclidSetsStore.getSelected[1])
</script>
