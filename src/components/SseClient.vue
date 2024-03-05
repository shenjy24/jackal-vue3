<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'

let message = ref("")
let lastUpdate = ref("")
let clientId = ref(1)
let eventSource = ref()

onMounted(() => {
  eventSource.value = new EventSource(`http://localhost:8080/sse/subscribe?clientId=${clientId.value}`)
  eventSource.value.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.log('sse data:', data)
    message.value = data.message;
    lastUpdate.value = data.timestamp;
  })

  eventSource.value.addEventListener("error", (error) => {
    console.error('sse error:', error);
    eventSource.value.close();
  })
})

onBeforeUnmount(() => {
  eventSource.value.close() // 卸载
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