'use strict'
// 1行目に記載している 'use strict' は削除しないでください

/**
 * @param {}
 * @returns 
 */
function releaseGators() {
  const num = Number(document.getElementById("gatorNum").value);
  // console.log(typeof num);
  const gotorsText = Array(num + 1).join("🐊"); //emptyをワニの文字でjoinする
  // let gotorsText = "";
  // for (let i = 0; i < num; i++) {
  //   gotorsText += "🐊";
  // }
  document.getElementById("blueBox").textContent = gotorsText;
}
const releaseButton = document.getElementById("releaseGators");
releaseButton.addEventListener("click", releaseGators)