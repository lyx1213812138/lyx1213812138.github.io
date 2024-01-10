<script setup>
import saveAllTime from './saveAllTime';
const timeInput = saveAllTime('TasksTimeInput');
const textInput = saveAllTime('TasksTextInput');
</script>

<template>
  <div class="page" id="pageInputTasks">
    <textarea class="input" id="timeInput" v-model="timeInput">
      {{ timeInput }}
    </textarea>
    <textarea class="input" id="textInput" v-model="textInput">
      {{ textInput }}
    </textarea>
  </div>
</template>

<style>
  #pageInputTasks {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #timeInput {
    height: 40px;
    width: 200px;
    padding: 10px;
    overflow: hidden;
  }
  #textInput {
    height: 350px;
  }
</style>