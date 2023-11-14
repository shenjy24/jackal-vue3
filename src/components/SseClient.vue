<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import axios from "axios";

let message = ref("")
let lastUpdate = ref("")
let clientId = ref(1)

function disconnectSse() {
  axios.get(`http://localhost:8080/sse/over?clientId=${clientId.value}`)
}

onMounted(() => {
  const eventSource = new EventSource(`http://localhost:8080/sse/subscribe?clientId=${clientId.value}`)
  eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.log('sse data:', data)
    message.value = data.message;
    lastUpdate.value = data.timestamp;
  })

  eventSource.addEventListener("error", (error) => {
    console.error('sse error:', error);
    disconnectSse()
  })
})

onUnmounted(() => {
  disconnectSse()
})
</script>

<template>
  <div>
    <h1>Message: {{ message }}</h1>
    <p>Last Update: {{ lastUpdate }}</p>
  </div>
</template>

<style scoped>

</style>