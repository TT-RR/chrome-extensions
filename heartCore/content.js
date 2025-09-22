(function() {
	// サイズを変更したい要素
	const targets = [
		{ selector: ".WCMmodal", width: "1400px", height: "800px", top: "80px", left: "250px" },
		{ selector: "#_compare", width: "1360px", height: "760px", top: "140px", left: "280px" }
	];

	// 非表示にしたい要素
	const hides = [ "#addnew", "#email" ];

	function applyFixedSize() {
		targets.forEach(t => {
			document.querySelectorAll(t.selector).forEach(el => {
			el.style.width = t.width;
			el.style.height = t.height;
			el.style.position = "fixed";
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

		document.querySelectorAll("th").forEach(th => {
			if(th.textContent.trim() === "サマリー") {
				const tr = th.closest("tr");
				if(tr) {
					tr.style.display = "none";
					if(tr.nextElementSibling) {
						tr.nextElementSibling.style.display = "none";
					}
				}
			}
		});

		document.querySelectorAll("th").forEach(th => {
			if(th.textContent.trim() === "プライマリコンテンツ") {
				const tr = th.closest("tr");
				if(tr) {
					tr.style.display = "none";
					if(tr.nextElementSibling) {
						tr.nextElementSibling.style.display = "none";
					}
				}
			}
		});

		document.querySelectorAll("th").forEach(th => {
			if(th.textContent.trim() === "コンテンツフォーマット") {
				const tr = th.closest("tr");
				if(tr) {
					tr.style.display = "none";
					if(tr.nextElementSibling) {
						tr.nextElementSibling.style.display = "none";
					}
				}
			}
		});

		document.querySelectorAll("th").forEach(th => {
			if(th.textContent.trim() === "サイト内検索") {
				const tr = th.closest("tr");
				if(tr) {
					tr.style.display = "none";
					if(tr.nextElementSibling) {
						tr.nextElementSibling.style.display = "none";
					}
				}
			}
		});

		document.querySelectorAll("th").forEach(th => {
			if(th.textContent.trim() === "パンくずリストとメニュー") {
				const tr = th.closest("tr");
				if(tr) {
					tr.style.display = "none";
					if(tr.nextElementSibling) {
						tr.nextElementSibling.style.display = "none";
					}
				}
			}
		});

		document.querySelectorAll("li").forEach(li => {
			if(li.textContent.trim() === "アクセシビリティ") {
				li.style.display = "none";
				if(li.nextElementSibling) {
					li.nextElementSibling.style.display = "none";
				}
			}
		});
	}

	// ページ読み込み後に1回だけ適用
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", applyFixedSize);
	} else {
		applyFixedSize();
	}

	const observer = new MutationObserver(() => applyFixedSize());
	observer.observe(document.body, { childList: true, subtree: true });
})();
