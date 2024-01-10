<script setup>
  import { ref } from 'vue';

  const props = defineProps({ nowEndTime : Object });
  const leftTime = ref(0);

  const calcTime = (time) =>  //把毫秒数转化为小时数和分钟数和秒数
    String(parseInt(time / 1000 / 60 / 60)).padStart(2, '0') + ' : ' + String(parseInt(time / 1000 / 60) % 60).padStart(2, '0') + ' : ' + String(parseInt(time / 1000) % 60).padStart(2, '0');

  setInterval(() => {
    if (props.nowEndTime.getTime()) 
      leftTime.value = calcTime(props.nowEndTime.getTime() - new Date().getTime());
  }, 500);

</script>

<template>
  <div class="countDown">
    {{ leftTime }}
  </div>
</template>

<style>
  .countDown {
    font-size: 30px;
    font-weight: 600;
    color: rgba(3, 43, 119, 1);
    width: 200px;
    position: absolute;
    left: calc(65%);
    top: 5px;
    border: rgb(217, 237, 223) solid;
    border-radius: 16px;
    padding: 10px;
    background-color: rgb(208, 231, 223);
    text-align: center;
  }
</style>