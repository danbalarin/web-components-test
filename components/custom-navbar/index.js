import { getShowLiked, setShowLiked } from "../../js/store";

const templateHTML = `
<link href="/dist/output.css" rel="stylesheet">
<nav class="navbar">
    <search-input></search-input>
	<custom-button><span slot="text">Show Liked</span></custom-button>
</nav>
`;

export class CustomNavbar extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = templateHTML;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		const likeButton = this.shadowRoot.querySelector("custom-button");
		likeButton.addEventListener("click", () => {
			const isShowLiked = getShowLiked();
			setShowLiked(!isShowLiked);
			this.shadowRoot.querySelector('span[slot="text"]').innerHTML = isShowLiked
				? "Show Liked"
				: "Show All";
		});
	}
}
