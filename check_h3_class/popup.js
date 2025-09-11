document.addEventListener("DOMContentLoaded", async () => {
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
			const { ok, errors } = results[0].result;
			const resultElement = document.getElementById("result");

			if (ok) {
			resultElement.textContent = "✅ すべてのh3のクラス名はOKです！";
			resultElement.style.color = "green";
			} else {
			resultElement.innerHTML = "❌ クラス名が間違っています！<br><br>";

			errors.forEach((err, i) => {
				const div = document.createElement("div");
				div.textContent = `エラー${i + 1}: ${err}`;
				div.style.color = "red";
				resultElement.appendChild(div);
			});
			}
		}
	);
});

	// 実際にタブ内で実行される関数
	function checkH3Class(className) {
		const all_h3 = document.querySelectorAll("h3");
		if (all_h3.length === 0) {
			return { ok: false, errors: ["h3タグが存在しません"] };
		}

		let errors = [];

		all_h3.forEach(h3 => {
			if(h3.classList.contains("noneContent")) {
				return;
			}
			// h3のクラスが article_title3 以外ならエラーに追加
			if (!h3.classList.contains(className)) {
				errors.push(h3.outerHTML);
			}
		});

		return { ok: errors.length === 0, errors };
	}