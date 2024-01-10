<script setup>
import { reactive } from 'vue';
import saveAllTime from './saveAllTime';
const logInput = saveAllTime('LogInput');
const logNum = saveAllTime('LogNum');
if (logNum.value == null) logNum.value = 0;
const logs = reactive([]);
for (let i = 0; i < logNum.value; i++ ) {
  logs[i] = localStorage.getItem(`log${i}`);
}

function addLog() {
  if (!logInput.value) return;
  localStorage.setItem(`log${logNum.value}`, logs[logNum.value] = logInput.value);
  logInput.value = '';
  ++logNum.value;
}

function deleteLog(id) {
  for (let i = id+1; i < logNum.value; i++ ) {
    localStorage.setItem(`log${i-1}`, logs[i-1] = logs[i]);
  }
  logNum.value--;
  localStorage.removeItem(`log${logNum.value}`);
  logs.pop();
}

</script>

<template>
  <div class="page" id="pageLog">
    <div>
      <textarea class="input" id="logInput" v-model="logInput"></textarea>
      <div class="submit" @click="addLog()">submit</div>  
    </div>
    <div class="tasks">
      <div v-for="(value, id) in logs" :key="id" class="task">
        <div class="content">{{ value }}</div>
        <div class="delete" @click="deleteLog(id)">x</div>
      </div>
    </div>  
  </div>
</template>

<style>
#pageLog {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#pageLog .tasks {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

#logInput {
  width: 500px;
  height: 370px;
}
</style>