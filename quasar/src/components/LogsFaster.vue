<template>
  <BaseSummary style="text-align: right">
    <span style="cursor: pointer" @click="store.isLoggingEnabled = !store.isLoggingEnabled"
      >logging: {{ store.isLoggingEnabled ? "on" : "off" }}
      <BaseTooltip>
        {{
          store.isLoggingEnabled
            ? "Slower computations, but proofs logged to the JS console"
            : "Faster computations, but no proofs (you need to trust me)"
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
