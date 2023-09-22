<template>
  <q-page class="flex row content-start">
    <BasicSelection class="q-mt-lg" />
    <div class="q-pa-md fit row wrap justify-start items-start content-start q-col-gutter-sm">
      <div class="col-md-6">
        <q-card v-if="EuclidSet">
          <q-card-section>
            <div class="row">
              <EuclidSetTitle />
              <NavigationButtons />
            </div>
            <ElementsBadge />
            <MultiplesBadge />
          </q-card-section>
          <q-card-section>
            <q-scroll-area style="height: 50vh"> {{ EuclidSet }} <EuclidSetInfo /> </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card v-if="FailuresSet">
          <q-card-section>
            <div class="row">
              <FailuresSetTitle />
              <LimitPrompt />
            </div>
            <FailuresBadge />
            <PercentageBadge />
          </q-card-section>
          <q-card-section>
            <q-scroll-area style="height: 50vh"> {{ FailuresSet }} <FailuresInfo /> </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
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
import FailuresSetTitle from "src/components/FailuresSetTitle.vue"
import FailuresInfo from "src/components/FailuresInfo.vue"
import EuclidSetInfo from "src/components/EuclidSetInfo.vue"

import { useEuclidSetsStore } from "src/stores/EuclidSets"

const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
const FailuresSet = computed(() => store.getSelected[1])
</script>
