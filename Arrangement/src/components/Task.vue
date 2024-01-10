<script setup>
  import countDown from './countDown.vue';

  const tasksStr = localStorage.getItem('TasksTextInput');
  const startTimeStr = localStorage.getItem('TasksTimeInput');

  const dealTime = (str) => { // 从输入字符串中提取出时间（小时数，分钟数）
    const time = {hour: 0, min: 0};
    if (typeof str !== 'string') return time;
    const match = str.match(/\d+(?=h)/);
    if (match) time.hour = parseInt(match[0]);
    const match2 = str.match(/\d+(?=min)/);
    if (match2) time.min = parseInt(match2[0]);
    return time;
  };

  const makeTime = (date) => { // Date对象 => xx:xx
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
  }

  const nowTime = new Date();
  const time = new Date(); // 计算每个task的time
  time.setHours(dealTime(startTimeStr).hour, dealTime(startTimeStr).min, 0);

  const nowEndTime = new Date(0); // the end time of now task

  // 创建每一个task，{id, value, timeSpan, isNowTask}
  // filter : delete the null string
  const tasks = tasksStr.split('\n').filter(val => val).map((value, id) => {
    const timeLength = dealTime(value);
    const startTime = new Date(); startTime.setTime(time.getTime()); // tmp varible
    time.setTime(time.getTime() + timeLength.hour * 60 * 60 * 1000 + timeLength.min * 60 * 1000);

    const isNowTask = startTime <= nowTime && nowTime <= time;
    if (isNowTask) nowEndTime.setTime(time.getTime());

    return {
      id: id,
      value: value,
      timeSpan: makeTime(startTime) + '-' + makeTime(time),
      isNowTask: isNowTask
    }
  });

</script>

<template>
  <div class="page" id="pageTasks">
    <div class="tasks">
      <div v-for="task in tasks" key="task.id" :class="task.isNowTask? 'task nowTask' : 'task'">
        <div class="content">{{ task.value }}</div>
        <div class="time">{{ task.timeSpan }}</div>
      </div>
    </div>
    <countDown :nowEndTime="nowEndTime"/>
    <!-- function for really finish this task --> 
  </div>
</template>

<style>
.nowTask {
  background: rgb(156, 205, 245);
}
</style>