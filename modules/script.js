'use strict'

//初期パラメータ
function setParams() {
  const params = {};
  params.isStart = false;
  params.playerHand = undefined;
  params.cpuHand = undefined;
  params.mode = homeConfig.get("mode");
  params.level = homeConfig.get("level");
  params.times = homeConfig.get("times");
  params.timer = document.getElementById("timer");
  params.intervalId = Number(params.timer.textContent)
  params.initialTimer = document.getElementById("timer").textContent;
  params.timeId = null;
  params.message = document.getElementById("message");
  params.judge = document.getElementById("judge");
  params.wins = 0; //勝利数
  return function () {
    return params;
  }
}

// じゃんけんの選択時（マウスモード）
function mouseSetHand() {
  // ボタンのstyle初期設定（色のみ）
  for (const element of document.getElementsByClassName("rspButton")) {
    element.style.backgroundColor = "lightblue";
    element.style.border = "solid blue";
  }
  const initialStyle = document.getElementsByClassName("rspButton")[0].style; //初期色保存
  const initialBackgroundColor = initialStyle.backgroundColor;
  const initialBorder = initialStyle.border;

  // 実行時の選択
  //読み込み時は、this = undefined;
  if (this !== undefined && config.isStart === true) {
    config.playerHand = this.value;
    for (const element of document.getElementsByClassName("rspButton")) {
      if (this.id === element.id) {
        element.style.backgroundColor = "lightgreen";
        element.style.border = "dashed red";
        document.getElementById("hand").textContent = element.textContent;
      } else {
        // console.log(`isc:${initialBackgroundColor}`);
        element.style.backgroundColor = initialBackgroundColor;
        element.style.border = initialBorder;
      }
    }
  }
}
// じゃんけんの選択時（カメラモード）
async function cameraSetHand(image) {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: 'mediapipe', // or 'tfjs',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
    modelType: 'full'
  }
  const detector = await handPoseDetection.createDetector(model, detectorConfig);
  const hands = await detector.estimateHands(image);
  // const reshands = hands.then(result => {
  //   let reshand;
  //   if (result[0] !== undefined) {
  //     reshand = result[0].keypoints;
  //   }
  // })
  // if (reshands === undefined) {
  //   console.log("カメラに手が写っていません");
  // }
  return hands;
}
// カメラの開始と停止
async function camraStart() {
  try {
    const video = document.getElementById("video");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}
function stopCamera() {
  const stream = document.getElementById("video").srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(track => {
    track.stop();
  });
  document.getElementById("video").srcObject = null;
}

//CPUの選択を決める
function cpuSetHand() {
  const selectObject = rspOperation(config.playerHand);
  const rspCpuObject = { rock: "グー", scissors: "チョキ", paper: "パー" };
  const selectProb = Math.floor(Math.random() * 100);
  console.log(`prob:${selectProb}`);
  if (config.level === "easy") {
    if (selectProb <= 85) {
      config.cpuHand = selectObject.lose;
    } else if (selectProb <= 95) {
      config.cpuHand = selectObject.draw;
    } else {
      config.cpuHand = selectObject.win;
    }
  }
  if (config.level === "normal") {
    if (selectProb <= 75) {
      config.cpuHand = selectObject.lose;
    } else if (selectProb <= 85) {
      config.cpuHand = selectObject.draw;
    } else {
      config.cpuHand = selectObject.win;
    }
  }
  if (config.level === "hard") {
    if (selectProb <= 60) {
      config.cpuHand = selectObject.lose;
    } else if (selectProb <= 80) {
      config.cpuHand = selectObject.draw;
    } else {
      config.cpuHand = selectObject.win;
    }
  }
  document.getElementById("cpuButton").textContent = rspCpuObject[config.cpuHand];
}
//選択を入れたら、入力値に対して勝ち、あいこ、負けのオブジェクトが返ってくる
function rspOperation(hand) {
  const rspObject = {
    win: undefined,
    draw: undefined,
    lose: undefined,
  };
  if (hand === "rock") {
    rspObject.win = "paper";
    rspObject.draw = "rock";
    rspObject.lose = "scissors";
  } else if (hand === "scissors") {
    rspObject.lose = "paper";
    rspObject.win = "rock";
    rspObject.draw = "scissors";
  } else {
    rspObject.draw = "paper";
    rspObject.lose = "rock";
    rspObject.win = "scissors";
  }
  return rspObject;
}

// ゲームスタート
function gameStart() {
  if (config.mode === "mouse_mode") {
    mouseSetHand();
  }
  config.isStart = true;
  config.message.textContent = "選んで！";
  document.getElementById("hand").textContent = "---";
  document.getElementById("cpuButton").textContent = "---";
  // config.intervalId = Number(config.timer.textContent);
  config.timeId = setInterval(reduceTime, 1000);
}
// reduceTime
function reduceTime() {
  config.intervalId -= 1;
  console.log(config.intervalId);
  config.timer.textContent = config.intervalId;
  if (config.intervalId <= 0) {
    clearInterval(config.timeId);
    config.timeId = null;
    config.message.textContent = `あなたは、${config.playerHand}を選択`;
    gameEnd();
  }
}

function judgement(playerHand, cpuHand) {
  console.log(`playerHand:${playerHand}`);
  console.log(`cpuHand  :${cpuHand}`);
  config.isWin = 0;
  if (playerHand === undefined) {
    config.judge.textContent = "選ばなかったのであなたの負けです";
    config.isWin = -1;
  } else if (playerHand === cpuHand) {
    config.judge.textContent = "あいこ！";
  } else if (
    (playerHand === "rock" && cpuHand === "scissors") ||
    (playerHand === "scissors" && cpuHand === "paper") ||
    (playerHand === "paper" && cpuHand === "rock")) {
    config.judge.textContent = `CPU:${cpuHand} あなたの勝ちです`;
    config.isWin = 1;
  } else {
    config.judge.textContent = `CPU:${cpuHand} あなたの負けです`;
    config.isWin = -1;
  }
}
function gameEnd() {
  cpuSetHand();
  config.isStart = false;
  // console.log(config.intervalId);
  judgement(config.playerHand, config.cpuHand);
  config.intervalId = Number(config.initialTimer);
  config.playerHand = undefined;
  if (config.isWin === 1) {
    config.wins += 1;
    console.log(`勝利数：${config.wins}/${config.times}`);
    if (config.times > config.wins) {
      config.timer.textContent = config.intervalId;
      _.delay(gameStart, 1000);
    } else {
      config.judge.textContent = `ゲームクリア`;
    }
  } else if (config.isWin === 0) {
    // config.timer.textContent = config.intervalId;
    // _.delay(gameStart, 1000);
    gameStart();
  } else {
    config.judge.textContent = `ゲームオーバー`;
  }
}

//-----------------------------------
//初期設定
const config = setParams()();

//呼び出し
window.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !config.isStart) {
    console.log("start");
    gameStart();
  }
});

//マウスモードボタン選択時の動き
if (config.mode === "mouse_mode") {
  mouseSetHand();
  document.getElementById("rockButton").addEventListener("click", mouseSetHand);
  document.getElementById("scissorsButton").addEventListener("click", mouseSetHand);
  document.getElementById("paperButton").addEventListener("click", mouseSetHand);
}

if (config.mode === "camera_mode") {
  camraStart();
}
// camraStart();
// cameraSetHand(document.getElementById("video"))