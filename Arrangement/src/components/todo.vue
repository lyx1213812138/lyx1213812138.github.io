<script setup>
import { reactive } from 'vue';
import saveAllTime from './saveAllTime';
const todoInput = saveAllTime('TodoInput');
const todoNum = saveAllTime('TodoNum');
if (todoNum.value == null) todoNum.value = 0;
const todos = reactive([]);
for (let i = 0; i < todoNum.value; i++ ) {
  todos[i] = localStorage.getItem(`todo${i}`);
}

function addTodo() {
  if (!todoInput.value) return;
  localStorage.setItem(`todo${todoNum.value}`, todos[todoNum.value] = todoInput.value);
  todoInput.value = '';
  ++todoNum.value;
}

function deleteTodo(id) {
  for (let i = id+1; i < todoNum.value; i++ ) {
    localStorage.setItem(`todo${i-1}`, todos[i-1] = todos[i]);
  }
  todoNum.value--;
  localStorage.removeItem(`todo${todoNum.value}`);
  todos.pop();
}

</script>

<template>
  <div class="page" id="pageTodo">
    <div>
      <textarea class="input" id="todoInput" v-model="todoInput"></textarea>
      <div class="submit" @click="addTodo()">submit</div>  
    </div>
    <div class="tasks">
      <div v-for="(value, id) in todos" :key="id" class="task">
        <div class="content">{{ value }}</div>
        <div class="delete" @click="deleteTodo(id)">x</div>
      </div>
    </div>  
  </div>
</template>

<style>
#pageTodo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#pageTodo .tasks {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

#todoInput {
  width: 500px;
  height: 370px;
}
</style>