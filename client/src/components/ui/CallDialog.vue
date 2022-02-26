<template>
  <q-dialog
    v-model="callDialog"
    persistent
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card class="bg-blue-grey text-white">
      <q-card-section class="q-mt-xl q-mb-none text-center">
        <div class="text-h4">{{ user.username }}</div>
        <div class="calling">calling {{ user.username }}...</div>
      </q-card-section>

      <q-card-section class="q-pt-none absolute-center">
        <q-avatar size="200px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </q-card-section>
      <q-card-actions>
        <q-card class="buttons bg-blue-grey-8">
          <q-card-section class="row items-center no-wrap q-mx-lg q-mt-sm">
            <q-btn
            v-if="!isDeaf"
              id="deaf"
              class="q-mx-auto"
              round
              color="blue-grey"
              icon="mdi-volume-high"
              size="16px"
              @click="onDeafen"
            />
                        <q-btn
                        v-else
              id="deaf"
              class="q-mx-auto"
              round
              color="blue-grey-3"
              icon="mdi-volume-mute"
              size="16px"
              @click="onDeafen"
            />
                        <q-btn
              v-if="!isMute"
              id="mic"
              class="q-mx-auto"
              round
              color="blue-grey"
              icon="mdi-microphone"
              size="16px"
              @click="onMute"
            />
            <q-btn
              v-else
              id="mic"
              class="q-mx-auto active"
              round
              color="blue-grey-3"
              icon="mdi-microphone-off"
              size="16px"
              @click="onMute"
            />
            <q-btn
            v-if="!isVideo"
              id="video"
              class="q-mx-auto"
              round
              color="blue-grey"
              icon="mdi-video"
              size="16px"
              @click="onVideo"
            />
                        <q-btn
            v-else
              id="video"
              class="q-mx-auto"
              round
              color="blue-5"
              icon="mdi-video"
              size="16px"
              @click="onVideo"
            />
            <q-btn
              class="q-mx-auto"
              round
              color="red"
              icon="mdi-phone-hangup"
              size="16px"
              @click="$emit('callDecline')"
            />
          </q-card-section>
        </q-card>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from "vue";

export default defineComponent({
  props: ["callDialogProp", "user"],
  emits: ["callDecline"],
  setup(props) {
    const callDialog = toRef(props, "callDialogProp");
    const isDeaf = ref(false);
    const isMute = ref(false);
    const isVideo = ref(false);

    function onMute() {
      isMute.value = !isMute.value;
    }

    function onDeafen() {
      isDeaf.value = !isDeaf.value
    }

    function onVideo(){
      isVideo.value = !isVideo.value
    }

    return {
      callDialog,
      onMute,
      onDeafen,
      onVideo,
      isMute,
      isDeaf,
      isVideo,
    };
  },
});
</script>

<style scoped>
.calling {
  color: rgba(255, 255, 255, 0.589);
}
.buttons {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  left: 0;
  right: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-left: auto;
  margin-right: auto;
}
</style>