// 光らせるCSSを埋め込み
const style = document.createElement("style");
style.textContent = `
a.visited-glow {
  outline: 2px solid orange;
  border-radius: 4px;
  box-shadow: 0 0 5px orange;
}
`;
document.head.appendChild(style);

// クリックしたリンクを光らせる
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (a) {
    a.classList.add("visited-glow");
  }
});
