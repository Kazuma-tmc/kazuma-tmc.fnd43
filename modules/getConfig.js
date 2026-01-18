'use strict'

// 遷移先で設定を読み込む
function getConfig() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const level = params.get("level");
  const times = params.get("times");
  document.getElementById("config").innerHTML = `<p>モード：${mode}・難易度：${level}・設定回数：${times}回</p>`;
  return function () {
    return params;
  }
}

const homeConfig = getConfig()();
