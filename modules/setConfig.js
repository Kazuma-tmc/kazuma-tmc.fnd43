'use strict'
// 初期設定+スタート
function setConfig() {
  // 難易度設定
  const levelList = document.getElementsByName("levelSelector");
  let modeLevel = "";
  for (const element of levelList) {
    if (element.checked) {
      modeLevel = element.value;
    }
  }
  // 設定回数
  const numOfTimes = document.getElementById("numOfTimes").selectedOptions[0].value;
  // モード選択（url?）
  const modeList = document.getElementsByName("modeSelector");
  let modeLink = ".index.html";
  for (const element of modeList) {
    if (element.checked) {
      modeLink = `./${element.value}.html?mode=${element.value}&level=${modeLevel}&times=${numOfTimes}`;
    }
  }

  // console.log(`遷移先：${modeLink}`);
  // console.log(`レベル：${modeLevel}`);
  // console.log(`回数  ：${numOfTimes}`);

  // ページ遷移と設定値引き渡し
  // setTimeout(() => {window.location.href = modeLink}, 100);
  window.location.href = modeLink;
}

document.getElementById("startButton").addEventListener("click", setConfig);