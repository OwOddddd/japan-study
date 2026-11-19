// 日文例句的播放按鈕：頁面上有 data-audio 的按鈕都會綁上播放（語音：VOICEVOX:青山龍星）
(function () {
  var player = new Audio();
  document.querySelectorAll('[data-audio]').forEach(function (b) {
    b.textContent = '▶ 聽';
    b.onclick = function () { player.pause(); player.src = b.dataset.audio; player.currentTime = 0; player.play(); };
  });
})();
