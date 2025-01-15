function updateText(element) {
	element.textContent = "Hidden to protect privacy";
}

function observeElement(element) {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === "childList" || mutation.type === "characterData") {
				updateText(element);
			}
		});
	});

	const config = { childList: true, characterData: true, subtree: true };
	observer.observe(element, config);
}

function waitForElement() {
	return new Promise((resolve) => {
		const checkInterval = setInterval(() => {
			const element = document.querySelector("#nav-robux-amount");
			if (element && element.textContent.trim() !== "") {
				clearInterval(checkInterval);
				resolve(element);
			}
		}, 1);
	});
}

async function main() {
	const targetElement = await waitForElement();
	updateText(targetElement);
	observeElement(targetElement);
}

main();