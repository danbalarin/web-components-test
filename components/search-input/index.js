import { search } from "../../js/api.js";
import { debounce } from "../../js/utils.js";
import { setCharacters } from "../../js/store.js";

const templateHTML = `
<link href="/dist/output.css" rel="stylesheet">
<input class="search-input" type="text" placeholder="Search for character" autocomplete="search" />
`;

const searchCharacters = debounce(async (event) => {
	try {
		const query = event.data;
		const results = await search(query);
		setCharacters(results.results);
	} catch (e) {
		if (e.status === 404) {
			setCharacters([]);
		}
	}
}, 350);

export class SearchInput extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = templateHTML;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		const input = this.shadowRoot.querySelector("input");
		input.addEventListener("input", searchCharacters);
	}
}
