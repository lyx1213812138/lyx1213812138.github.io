<script setup>
import { reactive } from 'vue';
import saveAllTime from './saveAllTime';
const proverbInput = saveAllTime('ProverbInput');
const proverbNum = saveAllTime('ProverbNum');
if (proverbNum.value == null) proverbNum.value = 0;
const proverbs = reactive([]);
for (let i = 0; i < proverbNum.value; i++ ) {
  proverbs[i] = localStorage.getItem(`proverb${i}`);
}

function addProverb() {
  if (!proverbInput.value) return;
  localStorage.setItem(`proverb${proverbNum.value}`, proverbs[proverbNum.value] = proverbInput.value);
  proverbInput.value = '';
  ++proverbNum.value;
}

function deleteProverb(id) {
  for (let i = id+1; i < proverbNum.value; i++ ) {
    localStorage.setItem(`proverb${i-1}`, proverbs[i-1] = proverbs[i]);
  }
  proverbNum.value--;
  localStorage.removeItem(`proverb${proverbNum.value}`);
  proverbs.pop();
}

</script>

<template>
  <div class="page" id="pageProverb">
    <div>
      <textarea class="input" id="proverbInput" v-model="proverbInput"></textarea>
      <div class="submit" @click="addProverb()">submit</div>  
    </div>
    <div class="tasks">
      <div v-for="(value, id) in proverbs" :key="id" class="task">
        <div class="content">{{ value }}</div>
        <div class="delete" @click="deleteProverb(id)">x</div>
      </div>
    </div>  
  </div>
</template>

<style>
#pageProverb {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#pageProverb .tasks {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

#proverbInput {
  width: 500px;
  height: 370px;
}
</style>