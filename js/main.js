import {
	getCharacters,
	getFromLocalStorage,
	setCharacters,
	subscribeToCharacters,
	subscribeToShowLiked,
} from "./store";
import { onCardClick } from "./animations";
import { CharacterCard } from "../components";
import { api } from "./api";

let apiCharacters = [];

(() => {
	// Initial load
	api("character").then((response) => {
		apiCharacters = response.results;
		setCharacters(response.results);
	});

	// Hide like button
	document.querySelector("#like").style.opacity = 0;
})();

const onShowLikedChange = (showLiked) => {
	if (showLiked) {
		const likedCharacters = getFromLocalStorage();
		apiCharacters = getCharacters();
		setCharacters(likedCharacters);
	} else {
		setCharacters(apiCharacters);
	}
};

const onCharacterChange = (characters) => {
	const main = document.querySelector("main");
	const likedCharacters = getFromLocalStorage();
	const characterCards = characters.map((character) => {
		const card = CharacterCard.factory(character, "small");
		if (likedCharacters.some((c) => c.id === character.id)) {
			card.setLiked(true);
		}
		return card;
	});

	if (!characterCards.length) {
		const noData = document.createElement("no-data");
		main.innerHTML = noData.outerHTML;
	} else {
		main.innerHTML = "";
		characterCards.forEach((c) => {
			main.appendChild(c);
			c.addEventListener("click", onCardClick);
		});
	}
};

subscribeToShowLiked(onShowLikedChange);
subscribeToCharacters(onCharacterChange);
