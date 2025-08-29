// background.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
(async () => {
try {
if (msg?.type === 'FETCH_RAW_HTML') {
const url = msg.url;
// ブロックされがちなスキームは防御
if (!/^https?:\/\//i.test(url)) {
return sendResponse({ ok: false, error: 'このURLスキームは取得不可です: ' + url });
}
const res = await fetch(url, {
method: 'GET',
credentials: 'include',
cache: 'no-store'
});
const text = await res.text();
return sendResponse({ ok: true, html: text });
}
} catch (e) {
return sendResponse({ ok: false, error: String(e) });
}
})();
// 非同期応答を使う
return true;
});