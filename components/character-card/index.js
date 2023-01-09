import male from "../../images/male.svg?url";
import female from "../../images/female.svg?url";
import unknown from "../../images/unknown.svg?url";

const templateHTML = `
<link href="/dist/output.css" rel="stylesheet">
<article class="card">
  <div class="card-back"></div>
  <div class="card-front rotate">
    <div class="card-effect glare"></div>
    <div class="card-overlay"></div>
    <span class="card-id">{:id}</span>
    <img src="https://rickandmortyapi.com/api/character/avatar/{:id}.jpeg" alt="{:name}" class="card-image" />
    <section class="card-body">
        <h1 class="card-name">
            {:name}
        </h1>
        <h2 class="card-species">
            {:species}
        </h2>
        <span class="card-origin">
        Place of origin: {:origin}
        </span>
    </section>
    <img class="card-gender" src="{:genderSVG}" alt="{:trueGender}" />
  </div>
</article>
`;

const getCharacterDetails = async (id) => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/character/${id}`
	);
	const data = await response.json();
	return data;
};

export class CharacterCard extends HTMLElement {
	static factory(character, size = "small") {
		const card = new CharacterCard();
		card.character = character;
		card.dataset.id = character.id;
		card.dataset.size = size;
		return card;
	}

	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = templateHTML;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		if (this.dataset.id !== undefined) {
			this.hydrate();
		}
	}

	setLiked(liked) {
		console.log("setLiked", liked);
		liked
			? this.shadowRoot.querySelector(".card-front").classList.add("liked")
			: this.shadowRoot.querySelector(".card-front").classList.remove("liked");
	}

	async animateIn() {
		return new Promise((resolve) => {
			const cardFront = this.shadowRoot.querySelector(".card-front");
			const cardBack = this.shadowRoot.querySelector(".card-back");

			const duration = 1;

			gsap.set(cardFront, { rotationY: "90" });
			const tl = gsap.timeline({ onComplete: resolve });
			tl.to(cardBack, {
				rotationY: "90",
				duration: duration / 2,
				ease: "power1.in",
			});
			tl.to(cardFront, {
				rotationY: "0",
				duration: duration / 2,
				ease: "power1.out",
			});
			tl.set(cardBack, { opacity: 0 });
		});
	}

	async hydrate() {
		let data = this.character;

		if (!data) {
			const id = this.getAttribute("data-id");
			data = await getCharacterDetails(id);
		}
		this.replaceVariables(data);

		this.setupListeners();

		await this.animateIn();
	}

	replaceVariables({
		id,
		name,
		species,
		gender,
		origin: { name: originName },
	}) {
		const content = this.shadowRoot.innerHTML;
		let hydratedContent = content.replace(/{:id}/g, id);
		hydratedContent = hydratedContent.replace(/{:name}/g, name);
		hydratedContent = hydratedContent.replace(/{:species}/g, species);
		hydratedContent = hydratedContent.replace(/{:trueGender}/g, gender);
		let genderIcon = unknown;
		gender.toLowerCase() === "male" && (genderIcon = male);
		gender.toLowerCase() === "female" && (genderIcon = female);
		hydratedContent = hydratedContent.replace(/{:genderSVG}/g, genderIcon);
		hydratedContent = hydratedContent.replace(/{:origin}/g, originName);
		this.shadowRoot.innerHTML = hydratedContent;
	}

	setupListeners() {
		this.shadowRoot
			.querySelector(".card")
			.addEventListener("mousemove", this.handleHover.bind(this));
	}

	startAnimation() {
		window.addEventListener("mousemove", this.handleGlobalHover.bind(this));
	}

	stopAnimation() {
		window.removeEventListener("mousemove", this.handleGlobalHover.bind(this));
		const card = this.shadowRoot.querySelector(".card");
		gsap.to(card, {
			rotationY: `0deg`,
			rotationX: `0deg`,
			perspective: 100,
		});
	}

	handleGlobalHover(event) {
		const card = this.shadowRoot.querySelector(".card");
		const constrain = 35;
		const box = card.getBoundingClientRect();
		const calcX = -(event.clientX - box.y - box.height / 2) / constrain;
		const calcY = (event.clientY - box.x - box.width / 2) / constrain;

		gsap.set(card, {
			rotationY: `${calcX}deg`,
			rotationX: `${calcY}deg`,
			perspective: 100,
		});
	}

	handleHover(event) {
		const rect = event.target.getBoundingClientRect();
		const absolute = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
		const percent = {
			x: Math.round((100 / rect.width) * absolute.x),
			y: Math.round((100 / rect.height) * absolute.y),
		};
		const card = this.shadowRoot.querySelector(".card");

		card.style.setProperty("--mx", `${percent.x}%`);
		card.style.setProperty("--my", `${percent.y}%`);
	}
}
