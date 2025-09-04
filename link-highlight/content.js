document.getElementById('glow-btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // style を一回だけ挿入
        if (!document.getElementById('__glow_style__')) {
          const s = document.createElement('style');
          s.id = '__glow_style__';
          s.textContent = `
            a.glow-link {
              outline: 4px solid #eaea00ff;
              border-radius: 4px;
              box-shadow: 0 0 5px #eaea00ff;
              transition: background-color 0.3s;
            }
            a.glow-visited {
              outline: 2px solid gray;
              box-shadow: 0 0 5px gray;
              color: #666 !important;
            }
          `;
          document.head.appendChild(s);
        }

        // ページ内のすべてのリンクにクラス付与 & クリックイベント
        document.querySelectorAll('a[href]').forEach(a => {
          a.classList.add('glow-link');

          // クリック時にクラスを追加
          a.addEventListener('click', () => {
            a.classList.add('glow-visited');
          }, { once: true }); // once:true にすると1回だけ実行
        });
      }
    });
  } catch (err) {
    console.error('executeScript failed', err);
    alert('このページでは実行できません（例: chrome:// や CSP 制限があるページ）。');
  }
});
