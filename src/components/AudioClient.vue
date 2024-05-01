<script setup>
import {ref} from 'vue'

let audioData = ref("")

function play() {
  const audio = new Audio();
  audio.src = "data:audio/mp3;base64," + audioData.value
  audio.play()
}
</script>

<template>
  <div>
    <textarea v-model="audioData"/>
    <button @click="play">播放</button>
  </div>
</template>

<style scoped>
textarea {
  width: 300px; /* 设置文本框的宽度 */
  height: 200px; /* 设置文本框的高度 */
}
</style>