const gets = (str) => document.querySelector(str);
const tasks = gets('#pageTasks .tasks');
const divisionStr = '!@#$%^&*()';
let nowEndTime;

setTimeout(() => {
  submitTask.click();
  gets('#optionTasks').click();
}, 1);

const dealTime = (str) => {
  // console.log(str);
  const time = {hour: 0, min: 0};
  if (typeof str !== 'string') return time;
  const regex = /\d+(?=h)/, match = str.match(regex);
  if (match) {
    // console.log(match[0]);
    time.hour = parseInt(match[0]);
  }
  const regex2 = /\d+(?=min)/, match2 = str.match(regex2);
  if (match2) {
    // console.log(match2[0]);
    time.min = parseInt(match2[0]);
  }
  // console.log(str, time);
  return time;
};

const makeTime = (date) => {
  // console.log('maketime',date);
  return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
}

const submitTask = gets('.submit');
submitTask.addEventListener('click', () => {
  tasks.innerHTML = '';
  const strArr = gets('#textInput').value.split('\n');
  const nowTime = new Date();
  let lastTime = new Date(), lastTimevalue = dealTime(timeInput.value);
  lastTime.setHours(lastTimevalue.hour, lastTimevalue.min, 0);
  console.log(lastTime);
  strArr.forEach((val, ind) => {
    if (!val) return;
    const task = document.createElement('div');
    const text = val, time = dealTime(val);
    task.classList.add('task');
    const startTime = makeTime(lastTime);
    lastTime.setHours(lastTime.getHours() + time.hour, lastTime.getMinutes() + time.min);
    const endTime = makeTime(lastTime);
    task.innerHTML = `
      <div class="content">${val}</div>
      <div class="time">${startTime}-${endTime}</div>
    `;
    tasks.appendChild(task);

    if (startTime < makeTime(nowTime) && makeTime(nowTime) <= endTime) {
      task.classList.add('nowTask');
      nowEndTime = lastTime.getTime();// !!! 这里lasttime是Date对象，赋值时只是把地址赋值过去
      // console.log(text);
      // console.log(tmpEndTime);
    }
  });
  // console.log(nowEndTime);
});

let nowOption;
const changePages = (optionArr) => {
  optionArr.forEach((option) => {
    const optionNode = gets('#option' + option);
    optionNode.addEventListener('click', () => {
      optionNode.classList.add('optionClicked');
      gets('#page' + option).style.display = 'flex';
      if (nowOption) {
        gets('#option' + nowOption).classList.remove('optionClicked');
        gets('#page' + nowOption).style.display = 'none';
      }
      nowOption = option;
    });
  });
};

changePages(['Tasks', 'Input', 'Log', 'Proverb']);

const setStorage = (input) => {
  const inputNode = gets('#' + input);
  inputNode.value = localStorage.getItem(input + 'Value');
  inputNode.addEventListener('input', () => {
    localStorage.setItem(input + 'Value', inputNode.value);
  });
};

setStorage('timeInput');
setStorage('textInput');
setStorage('logInput');

//log

const appendLog = (text) => {
  const nowLog = document.createElement('div');
  nowLog.classList.add('task');

  const contentNode = document.createElement('div');
  contentNode.classList.add('content');
  contentNode.textContent = text;
  nowLog.appendChild(contentNode);
  
  const deleteNode = document.createElement('div');
  deleteNode.classList.add('delete');
  deleteNode.textContent = 'x';
  nowLog.appendChild(deleteNode);

  deleteNode.addEventListener('click', () => {
    gets('#pageLog .tasks').removeChild(nowLog);
    const textArr = localStorage.getItem('log').split(divisionStr);
    textArr.splice(textArr.indexOf(text), 1);
    localStorage.setItem('log', textArr.join(divisionStr));
  });

  gets('#pageLog .tasks').appendChild(nowLog);
};

gets('#pageLog .submit').addEventListener('click', () => {
  const text = gets('#logInput').value;
  gets('#logInput').value = '';
  localStorage.setItem('logInputValue', '');
  if (text) appendLog(text);
  localStorage.setItem('log', (localStorage.getItem('log') || '') + divisionStr + text);
});

const setLogStorage = () => {
  const tmp = localStorage.getItem('log');
  if (!tmp) return;
  const textArr = localStorage.getItem('log').split(divisionStr);
  textArr.forEach((text) => {
    if (text) appendLog(text);
  });
};
setLogStorage();

const proverb = [
  "做好眼前，不问将来"
];
const addProverb = () => {
  const id = new Date().getTime()%proverb.length;
  gets('#proverb').textContent = proverb[id];
};
addProverb();


const calcTime = (time) =>  //把毫秒数转化为小时数和分钟数
  parseInt(time / 1000 / 60 / 60) + ' : ' + parseInt(time / 1000 / 60) % 60 + ' : ' + parseInt(time / 1000) % 60;

const countDown = () => {
  setInterval(() => {
    // console.log(nowEndTime);
    if (nowEndTime) {
      const leftTime = calcTime(nowEndTime - new Date().getTime());
      gets('.countDown').textContent = leftTime;
    }
  }, 500);
};
countDown();