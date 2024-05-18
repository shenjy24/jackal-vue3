<template>
  <div>
    <button @click="startAudioStream">Play Audio</button>
  </div>
</template>

<script setup>
import {onUnmounted, ref} from 'vue';

const audioRef = ref(null);
const playButtonClicked = ref(false);
const audioQueue = ref([]);

let eventSource = null;

const startAudioStream = () => {
  playButtonClicked.value = true;
  audioRef.value = new Audio();

  // 启动SSE连接
  eventSource = new EventSource(`http://localhost:8080/sse/subscribe?clientId=1`); // 替换为实际的SSE流URL

  eventSource.onmessage = (event) => {
    const audioData = event.data;

    // 将音频数据推入队列
    audioQueue.value.push(audioData);

    // 如果当前没有正在播放的音频，则播放队列中的下一个音频
    if (audioRef.value.paused) {
      playNextAudio();
    }
  };

  // 监听音频播放结束事件
  audioRef.value.addEventListener('ended', () => {
    // 如果队列中还有音频，则播放队列中的下一个音频
    if (audioQueue.value.length > 0) {
        playNextAudio()
    }
  });

  // 监听错误事件
  eventSource.addEventListener('error', (error) => {
    console.error('SSE error:', error);
    eventSource.close();
  });
};

onUnmounted(() => {
  if (eventSource) {
    eventSource.close();
  }
  if (audioRef.value) {
    audioRef.value.pause();
    URL.revokeObjectURL(audioRef.value.src);
  }
});

const playNextAudio = () => {
  const audioData = audioQueue.value.shift(); // 从队列中获取下一个音频数据
  console.log('Play next audio:', audioData);

  // 手动添加 Base64 头部信息
  audioRef.value.src = `data:audio/mp3;base64,${audioData}`;
  audioRef.value.play();
};
</script>

<style scoped>
/* 可选的样式 */
</style>
