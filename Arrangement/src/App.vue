<script setup>
import Tasks from './components/Task.vue';
import InputTasks from './components/InputTasks.vue';
import Log from './components/log.vue';
import Todo from './components/todo.vue';
import Proverb from './components/proverb.vue';
const options = {
  Tasks,
  InputTasks,
  Log,
  Todo
};

import { ref } from 'vue';
import changeProverb from './components/changeProverb';

const nowOption = ref('Tasks');
const nowProverb = ref('放下未来，拥抱现在');
const footerStyle = ref('');
changeProverb(nowProverb, footerStyle);

</script>

<template>

  <header>
    <ul class="topBar">
      <li 
        v-for="(_, option) in options" 
        :key="option" 
        :class="['option', { clicked: nowOption === option }]" 
        @click="nowOption = option"
      >
        {{ option }}
      </li>
    </ul>
  </header>

  <article>
    <component :is="options[nowOption]" />
  </article>

  <footer>
    <div class="option" id="proverb" :style="footerStyle">
      {{ nowProverb }}
    </div>
  </footer>

</template>

<style scoped>
.topBar {
  display: flex;
  padding: 0px;
  margin-left: 20px;  
}
.option {
  height: 36px;
  font-size: 30px;
  font-weight: 500;
  color: rgba(3, 43, 119, 1);
  padding: 7px 20px;
  margin: 0px 10px;
  border-radius: 10px;
  text-align: center;
  vertical-align: center;
}
.clicked, .option:hover {
  background-color: #c1cad7;
}

#proverb {
  color: rgb(3, 107, 119);
}
#proverb:hover {
  background-color: initial;
}
footer {
  padding: 5px;
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 95vw;
  background-color: #f1f5f9;
}

</style>
