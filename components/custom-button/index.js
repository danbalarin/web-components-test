const templateHTML = `
<link href="/dist/output.css" rel="stylesheet">
<button class="btn"><slot name="text">Like</slot></button>
`;

export class CustomButton extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = templateHTML;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.content.cloneNode(true));
	}

	setIsLiked(isLiked) {
		this.shadowRoot.querySelector("slot").innerHTML = isLiked
			? "Unlike"
			: "Like";
	}
}
