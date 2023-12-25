const bodyRec = document.body.getBoundingClientRect();
const fireworkContainer = document.getElementById("fireworkContainer");
const dp = [];

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function initial() {
  const pieceNum = 1000;
  for (let i = 0; i < pieceNum; i++) {
    let piece = document.createElement("div");
    piece.classList.add('snow');
    piece.classList.add("piece");
    piece.style.height = piece.style.width = randomInt(15) + "px";
    piece.style.top = - randomInt(500) - 100 + "px"
    piece.style.left = randomInt(bodyRec.width) + "px";
    fireworkContainer.appendChild(piece);
  }
  const pieces = document.getElementsByClassName("piece");
  for (let i in pieces) {
    if (!pieces[i].style) continue;
    // console.log(pieces[i].style.left);
    dp.push({
      x: parseInt(pieces[i].style.left),
      y: parseInt(pieces[i].style.top),
      dx: randomInt(200),
      dy: Math.random() * 3 + 2,
      dt: randomInt(1000)
    });
  }
}
initial();

var flag = 0;
function firework() {
  if (flag) return;
  flag = 1;
  const pieces = document.getElementsByClassName("piece");
  let time = 0, passNum = 0;
  let interval = setInterval(() => {
    time++;
    for (let i in pieces) {
      if (!pieces[i].style) continue;
      // console.log(pieces[i].style.right, pieces[i].style.top, dp[i].x, dp[i].dx);
      pieces[i].style.left = dp[i].x + dp[i].dx * Math.sin((time + dp[i].dt) / 60) + "px";
      pieces[i].style.top = dp[i].y + dp[i].dy * time + "px";
      if (dp[i].y + dp[i].dy * time >= bodyRec.height + 100) {
        dp[i].y -= dp[i].dy * time;
      }
    }
  }, 50);
}
firework();

//lines

const initialLines = (linesStr,numLines) => {  
  // console.log(getLines());
  const linesArr = linesStr.split(/\r?\n/);
  const linesContainer = document.querySelector('#linesContainer');
  for (let i = 0; i < numLines; i++) {
    const line = document.createElement('div');
    line.classList.add('snowText', 'leaveLine');
    line.textContent = linesArr[i % linesArr.length];
    // setTimeout(() => {
      // console.log(line.getBoundingClientRect().width);
    line.style.top = parseInt(Math.random() * 100) + 'vh';
    line.style.left = parseInt(Math.random() * 70) + 'vw';
    // }, 1);
    // line.style.display = 'none';
    linesContainer.appendChild(line);
    
    line.addEventListener('mouseenter', () => {
      line.classList.add('enterLine');
      line.classList.remove('leaveLine');
    });

    line.addEventListener('mouseleave', () => {
      line.classList.add('leaveLine');
      line.classList.remove('enterLine');
    });
  }
}

const getLines = () => {
  fetch('./lines.txt')
    .then(response => response.text())
    .then(fileContent => {
      initialLines(fileContent, 50);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};


getLines();
