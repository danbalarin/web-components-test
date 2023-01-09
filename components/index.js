import { CharacterCard } from "./character-card/index.js";
import { NoData } from "./no-data/index.js";
import { CustomNavbar } from "./custom-navbar/index.js";
import { SearchInput } from "./search-input/index.js";
import { CustomButton } from "./custom-button/index.js";

customElements.define("character-card", CharacterCard);
customElements.define("search-input", SearchInput);
customElements.define("custom-navbar", CustomNavbar);
customElements.define("no-data", NoData);
customElements.define("custom-button", CustomButton);

export { CharacterCard, NoData, SearchInput };
