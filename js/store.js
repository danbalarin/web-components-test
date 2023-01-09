let characters = [];
const characterSubscribers = [];

export const setCharacters = (newCharacters) => {
	characters = [...newCharacters].splice(0, 6);
	characterSubscribers.forEach((callback) => callback(characters));
};

export const getCharacters = () => {
	return characters;
};

export const subscribeToCharacters = (callback) => {
	characterSubscribers.push(callback);
	callback(characters);
};

let showLiked = false;
const showLikedSubscribers = [];

export const setShowLiked = (show) => {
	showLiked = show;
	showLikedSubscribers.forEach((callback) => callback(showLiked));
};

export const getShowLiked = () => {
	return showLiked;
};

export const subscribeToShowLiked = (callback) => {
	showLikedSubscribers.push(callback);
	callback(showLiked);
};

const CHARACTERS_KEY = "characters";

export const getFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem(CHARACTERS_KEY) ?? "[]");
};

export const saveToLocalStorage = (characters) => {
	localStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters));
};

export const removeFromLocalStorage = (character) => {
	const characters = getFromLocalStorage();
	const index = characters.findIndex((c) => c.id === character.id);
	if (index > -1) {
		characters.splice(index, 1);
	}
	saveToLocalStorage(characters);
};

export const appendToLocalStorage = (character) => {
	const characters = getFromLocalStorage();
	characters.push(character);
	saveToLocalStorage(characters);
};
