export const debounce = (func, wait) => {
	let timeout;

	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export const scrollToggle = () => {
	const enableScroll = () => {
		document.querySelector("html").classList.remove("no-scroll");
	};
	const disableScroll = () => {
		document.querySelector("html").classList.add("no-scroll");
	};
	return { enable: enableScroll, disable: disableScroll };
};
