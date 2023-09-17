<template>
  <q-page class="flex row content-start">
    <BasicSelection class="q-mt-lg" />
    <div class="q-pa-md fit row wrap justify-start items-start content-start">
      <q-card class="col-md-6">
        <q-card-section>
          <div class="row">
            <div class="col text-body1">
              EuclidSet({{ EuclidSetsStore.selected.c }},{{ EuclidSetsStore.selected.m }})
              <sub>{{ EuclidSetsStore.selected.l }}</sub>
            </div>
            <div>
              <q-btn
                size="sm"
                class="q-mx-xs"
                :disable="EuclidSetsStore.currentPosition === EuclidSetsStore.firstPosition"
                square
                color="primary"
                :icon="matArrowBack"
                clickable
                @click="EuclidSetsStore.selectPrevious"
              />
              <q-btn
                size="sm"
                class="q-mx-xs"
                :disable="EuclidSetsStore.currentPosition === EuclidSetsStore.lastPosition"
                square
                color="primary"
                :icon="matArrowForward"
                clickable
                @click="EuclidSetsStore.selectNext"
              />
            </div>
          </div>
          <CardinalityBadge :count="EuclidSet?.length" />
          <q-badge class="q-ml-md" color="brown-6"
            >{{ EuclidSetsStore.multiples }} multiples</q-badge
          >
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
          <CardinalityBadge :count="FailuresSet.length" label="failures" />
          <q-badge class="q-ml-md" color="brown-6" title="failures / multiples"
            >{{ EuclidSetsStore.percentage }} %</q-badge
          >
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
import CardinalityBadge from "../components/CardinalityBadge.vue"
import LimitPrompt from "src/components/LimitPrompt.vue"
import { matArrowBack, matArrowForward } from "@quasar/extras/material-icons"

import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const EuclidSet = computed(() => EuclidSetsStore.getSelected[0])
const FailuresSet = computed(() => EuclidSetsStore.getSelected[1])
</script>
