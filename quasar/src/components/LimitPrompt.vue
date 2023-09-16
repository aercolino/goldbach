<template>
  <q-chip
    clickable
    dense
    color="red"
    text-color="white"
    label="to the infinity and beyond"
    @click="prompt = true"
  />
  <q-dialog
    v-model="prompt"
    persistent
    @update:model-value="
      (value) => !value && EuclidSetsStore.setSelected({ ...EuclidSetsStore.selected, l: limit })
    "
  >
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Set a bigger limit</div>
        With infinite many numbers in the <i>EuclidSet(c,m)</i> you wouldn't see any failing
        multiples, and that's what XGC is all about. As an infinity surrogate, you can set a bigger
        limit and see for yourself that its failing multiples are beyond the previous limit. BTW,
        the limit <i>L</i> is such that the last considered number will be <i>C + M x L</i>.
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="limit" dense autofocus />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup flat label="Set" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
import { storeToRefs } from "pinia"
import { matAllInclusive } from "@quasar/extras/material-icons"

const prompt = ref(false)
const EuclidSetsStore = useEuclidSetsStore()
const limit = ref(EuclidSetsStore.selected.l)
const { selected } = storeToRefs(EuclidSetsStore)
</script>
