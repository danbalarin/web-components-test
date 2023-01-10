import {
	appendToLocalStorage,
	getFromLocalStorage,
	removeFromLocalStorage,
} from "./store";
import { scrollToggle } from "./utils";

let selectedCard = null;
let animatableElement = null;

const backdrop = document.querySelector(".backdrop");
const likeButton = document.querySelector("custom-button");

const isCharacterLiked = (character) => {
	const ids = getFromLocalStorage().map((c) => c.id);
	return ids.includes(character.id);
};

(() => {
	backdrop.addEventListener("click", () => {
		if (selectedCard) {
			animateOut(selectedCard);
			selectedCard = null;
		}
	});

	likeButton.addEventListener("click", () => {
		if (selectedCard) {
			const isLiked = isCharacterLiked(selectedCard.character);
			if (isLiked) {
				removeFromLocalStorage(selectedCard.character);
			} else {
				appendToLocalStorage(selectedCard.character);
			}
			selectedCard.setLiked(!isLiked);
			animateOut(selectedCard);
			selectedCard = null;
		}
	});
})();

const createAnimatableElement = (originalElement) => {
	animatableElement =
		animatableElement || document.querySelector("#animatable");
	if (animatableElement) {
		animatableElement.remove();
	}
	animatableElement = originalElement.cloneNode(true);
	animatableElement.id = "animatable";
	document.querySelector("main").appendChild(animatableElement);

	const { top, left, width, height } = originalElement.getBoundingClientRect();

	const topWithOffset = top + window.scrollY;
	const leftWithOffset = left + window.scrollX;
	animatableElement.style.top = `${topWithOffset}px`;
	animatableElement.style.left = `${leftWithOffset}px`;
	animatableElement.style.width = `${width}px`;
	animatableElement.style.height = `${height}px`;

	animatableElement.addEventListener("click", () => {
		if (selectedCard) {
			animateOut(selectedCard);
			selectedCard = null;
		}
	});

	return animatableElement;
};

const animateIn = (element) => {
	const tl = gsap.timeline();
	const { disable } = scrollToggle();
	const animatableElement = createAnimatableElement(element);
	likeButton.setIsLiked(isCharacterLiked(element.character));
	disable();

	const top = window.scrollY + window.innerHeight / 2;

	tl.set(element, { opacity: 0.001 });
	tl.set(backdrop, { zIndex: 15, opacity: 0 });
	tl.set(animatableElement, { scale: 1, zIndex: 20 });
	tl.set(likeButton, { opacity: 0, zIndex: 20 });
	tl.to(backdrop, {
		opacity: 0.8,
		ease: "power1.inOut",
		pointerEvents: "all",
	});
	tl.to(
		animatableElement,
		{
			"--glow": 1,
			scale: 1.25,
			top,
			left: "50%",
			xPercent: -50,
			yPercent: -50,
			ease: "power1.inOut",
		},
		0
	);
	tl.to(likeButton, { opacity: 1 }, 0.5);
	tl.call(() => animatableElement.startAnimation(), null, 1);
};

const animateOut = (element) => {
	animatableElement.stopAnimation();
	const { enable } = scrollToggle();

	const top = element.getBoundingClientRect().top + window.scrollY;
	const left = element.getBoundingClientRect().left + window.scrollX;
	const tl = gsap.timeline();
	tl.to(animatableElement, {
		scale: 1,
		top,
		left,
		xPercent: 0,
		yPercent: 0,
		ease: "power1.inOut",
	});
	tl.to(
		backdrop,
		{
			opacity: 0,
			pointerEvents: "none",
		},
		0
	);
	tl.to(likeButton, { opacity: 0, zIndex: -1 }, 0);
	tl.to(animatableElement, { "--glow": 0 });
	tl.to(element, { opacity: 1 });
	tl.call(() => animatableElement.remove());
	tl.call(() => enable());
};

export const onCardClick = (e) => {
	if (selectedCard) {
		animateOut(selectedCard);
	}
	if (selectedCard === e.target) {
		animateOut(selectedCard);
		selectedCard = null;
	} else {
		selectedCard = e.target;
		animateIn(e.target);
	}
};
