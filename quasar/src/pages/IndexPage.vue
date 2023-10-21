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
            <div class="row">
              <MultiplesSummary />
            </div>
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
            <div class="row">
              <PercentageSummary />
              <LogsFaster />
            </div>
          </q-card-section>
          <q-card-section>
            <q-scroll-area style="height: 50vh"> {{ FailuresSet }} </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BasicSelection from "../components/BasicSelection.vue"
import EuclidSetInfo from "../components/EuclidSetInfo.vue"
import EuclidSetTitle from "../components/EuclidSetTitle.vue"
import FailuresSetTitle from "../components/FailuresSetTitle.vue"
import LimitPrompt from "../components/LimitPrompt.vue"
import LogsFaster from "../components/LogsFaster.vue"
import MultiplesSummary from "../components/MultiplesSummary.vue"
import NavigationButtons from "../components/NavigationButtons.vue"
import PercentageSummary from "../components/PercentageSummary.vue"
import { computed } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
const FailuresSet = computed(() => store.getSelected[1])
</script>
