// popup.js
async function getActiveTab() {
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
return tab;
}


function setInfo(msg) {
document.getElementById('info').textContent = msg;
}


function setOutput(text) {
document.getElementById('output').value = text || '';
}


// ① DOMシリアライズ取得（表示後のHTML）
async function getDOMSerializedHTML() {
const tab = await getActiveTab();
if (!tab?.id) return setInfo('タブが見つかりません');


const [{ result } = {}] = await chrome.scripting.executeScript({
target: { tabId: tab.id, allFrames: false },
func: () => document.documentElement.outerHTML
});
setOutput(result || '');
setInfo(`DOM取得: ${tab.title}`);
}


// ② 生HTML取得（レスポンステキスト）
async function getRawHTML() {
const tab = await getActiveTab();
if (!tab?.url) return setInfo('URLが取得できません');


const res = await chrome.runtime.sendMessage({ type: 'FETCH_RAW_HTML', url: tab.url });
if (res?.ok) {
setOutput(res.html);
setInfo(`生HTML取得: ${tab.title}`);
} else {
setInfo(`失敗: ${res?.error || 'unknown'}`);
}
}


// ③ 保存（表示中の内容を .html）
async function saveHTML() {
const text = document.getElementById('output').value || '';
const blob = new Blob([text], { type: 'text/html' });
const url = URL.createObjectURL(blob);
try {
await chrome.downloads.download({
url,
filename: 'page-source.html',
saveAs: true
});
} finally {
setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
}


// イベント
addEventListener('DOMContentLoaded', () => {
document.getElementById('btn-dom').addEventListener('click', getDOMSerializedHTML);
document.getElementById('btn-raw').addEventListener('click', getRawHTML);
document.getElementById('btn-save').addEventListener('click', saveHTML);
});