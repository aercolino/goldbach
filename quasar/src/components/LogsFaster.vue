<template>
  <BaseSummary style="text-align: right">
    <span style="cursor: pointer" @click="store.isLoggingEnabled = !store.isLoggingEnabled"
      >logging: {{ store.isLoggingEnabled ? "on" : "off" }}
      <BaseTooltip free-width>
        {{
          store.isLoggingEnabled ? "Proofs logged to the JS console" : "Thank you for trusting me"
        }}
      </BaseTooltip></span
    >
  </BaseSummary>
</template>

<script setup>
import BaseTooltip from "./BaseTooltip.vue"
import BaseSummary from "./BaseSummary.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
