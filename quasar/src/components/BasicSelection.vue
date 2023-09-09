<template>
<div class="q-pa-md">
  <q-badge color="secondary">
    Modulus: {{ selectedModulus }}
  </q-badge>
  <q-badge color="secondary">
    Class: {{ selectedClass }}
  </q-badge>

  <q-slider style="width: 1000px"
    v-model="selectedModulus"
    selection-color="transparent"
    :min="0"
    :max="100"
    :step="1"
    :inner-min="2"
    snap
    label-always
    markers
    :marker-labels="objMarkerLabels"
  />
  <q-slider style="width: 1000px"
    v-model="selectedClass"
    selection-color="transparent"
    :min="0"
    :max="100"
    :step="1"
    :inner-min="1"
    :inner-max="selectedModulus - 1"
    snap
    label-always
    switch-label-side
    markers
    :thumb-color="thumbColor"
  />
</div>
<p>{{ primesToSelectedModulus }}</p>
</template>

<script setup>
import { ref, computed } from 'vue'
import { xgc_IsPrimeTo } from "../maths/XGC"

const arrayRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

const labels = arrayRange(0, 100, 5)
const selectedModulus = ref(2)
const selectedClass = ref(1)
const objMarkerLabels = Object.fromEntries(labels.map(x => [x,x]))
const thumbColor = computed(() => {
  return xgc_IsPrimeTo(selectedClass.value, selectedModulus.value) ? "green" : "red"
})
</script>
