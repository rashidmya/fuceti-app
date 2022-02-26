<template>
  <q-dialog persistent v-model="incomingCall.dialog" position="top">
    <q-card style="width: 100%">
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">{{ incomingCall.from.username }}</div>
          <div class="text-grey">Incoming call</div>
        </div>

        <q-space />

        <q-btn round icon="mdi-phone-hangup" color="red" @click="$emit('hangup')" />
        <q-btn round icon="mdi-phone" color="green" class="q-ml-md" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
    props: ['incomingCallProp'],
    setup(props){
        const incomingCall = toRef(props, 'incomingCallProp')

        return {
            incomingCall
        }
    }
})
</script>
