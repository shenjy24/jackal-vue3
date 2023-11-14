<script setup>
import {ref} from 'vue'
import axios from "axios";
import qs from "qs";

let imageUrl = ref("")
let prompt = ref("Best quality, masterpiece, ultra high res, (photorealistic:1.4), 1girl")

function paint() {
  console.log("prompt=" + prompt.value)
  const args = qs.stringify({
    "prompt": prompt.value
  })
  axios.post("http://localhost:8088/paint/avatar", args)
      .then(response => {
        console.log(response.data)
        if (response.data.code === '2000') {
          imageUrl.value = response.data.data
        }
      }).catch(error => {
        console.log(error)
      })
}
</script>

<template>
  <div class="panel">
    <div class="left">
      <img :src="imageUrl">
    </div>
    <div class="right">
      <input type="text" placeholder="enter your prompt" v-model="prompt" class="input"/>
      <button @click="paint" class="button">Generate</button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
}

.left {
  width: 512px;
  height: 512px;
}

.right {
  margin-left: 50px;
}

.input {
  width: 500px;
}

.button {

}
</style>