'use strict'

// 遷移先で設定を読み込む
function getConfig() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const level = params.get("level");
  const times = params.get("times");
  const levels = {easy:"初級",normal:"中級",hard:"上級",}
  document.getElementById("config").innerHTML = `<p>難易度：${levels[level]}・設定回数：${times}回</p>`;
  return function () {
    return params;
  }
}

const homeConfig = getConfig()();
