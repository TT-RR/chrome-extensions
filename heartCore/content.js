(function() {
  const targetClass = "WCMmodal";
  const fixedWidth = "1200px";        // ← 固定したい幅
  const fixedHeight = "200px";       // ← 固定したい高さ

  function applyFixedSize() {
    const elements = document.querySelectorAll(`.${targetClass}`);
    elements.forEach(el => {
      el.style.width = fixedWidth;
      el.style.height = fixedHeight;
    });
  }

  // ページ読み込み時
  applyFixedSize();

  // SPA対応: 動的に追加される要素も監視
  const observer = new MutationObserver(() => {
    applyFixedSize();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
