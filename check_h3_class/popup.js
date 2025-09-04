document.getElementById("checkBtn").addEventListener("click", async () => {
	// 現在アクティブなタブを取得
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	// content script を実行
	chrome.scripting.executeScript(
	{
		target: { tabId: tab.id },
		func: checkH3Class,
		args: ["article_title3"] // 判定したいクラス名
	},
	(results) => {
		const result = results[0].result
		const resultElement = document.getElementById("result");

		if(result) {
			resultElement.textContent = "✅ すべてのh3のクラス名はOKです！";
			resultElement.style.color = "green";
		} else {
			resultElement.textContent = "クラス名が間違っています！";
			resultElement.style.color = "red";
		}
	}
	);
});

// 実際にタブ内で実行される関数
function checkH3Class(className) {
	const all_h3 = document.querySelectorAll("h3");
	if(all_h3.length === 0 ) return false;

	return Array.from(all_h3).every(h3 => {
		// h3のクラスが className だけならOK
		return h3.classList.length === 1 && h3.classList.contains(className);
	})
}
