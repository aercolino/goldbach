<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 1000px">
    <q-badge color="secondary">
      Model: {{ value }} (0 to 100)
    </q-badge>

    <q-slider
      v-model="value"
      :min="0"
      :max="100"
      :step="1"
      :inner-min="2"
      snap
      label-always
      markers
      :marker-labels="objMarkerLabels"
      color="purple"
    />
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'IndexPage',
  setup () {
    const markers = new Array(101).fill().map((x, val) => (val === 1 || val % 5 === 0) ? val : null).filter(x => x)

    return {
      value: ref(2),
      objMarkerLabels: Object.fromEntries(markers.map(x => [x,x])),
    }
  },
}
</script>
