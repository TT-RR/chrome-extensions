(function() {
  // サイズを変更したい要素
  const targets = [
    { selector: ".WCMmodal", width: "1200px", height: "500px", top: "100px", left: "50px" },
    { selector: "#_compare", width: "1200px", height: "500px", top: "200px", left: "100px" }
  ];

  // 非表示にしたい要素
  const hides = [
    ".ads-banner",   // クラス
    "#popupDialog"   // ID
  ];

  function applyFixedSize() {
    // サイズ変更
    targets.forEach(t => {
      document.querySelectorAll(t.selector).forEach(el => {
        el.style.width = t.width;
        el.style.height = t.height;
        el.style.position = "absolute"; // 必要に応じて "fixed"
        el.style.top = t.top;
        el.style.left = t.left;
      });
    });

    // 非表示
    hides.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.display = "none";
      });
    });
  }

  // ページ読み込み後に1回だけ適用
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFixedSize);
  } else {
    applyFixedSize();
  }
})();
