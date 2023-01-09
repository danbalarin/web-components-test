import { subscribeToShowLiked } from "../../js/store";

const templateHTML = `
<link href="/dist/output.css" rel="stylesheet">
<span>No data</span>
`;

export class NoData extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = templateHTML;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		const changeText = (showLiked) => {
			const text = this.shadowRoot.querySelector("span");
			text.innerHTML = showLiked ? "No liked characters" : "No characters";
		};
		subscribeToShowLiked(changeText);
	}
}
