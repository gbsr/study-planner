import PrioList from "./PrioList";
import { useStore } from "../../data/store.js";

describe("<PrioList />", () => {
	it("should mount without crashing", () => {
		cy.mount(<PrioList />);
	});

	it("should filter items based on search term", () => {
		cy.mount(<PrioList />);
		cy.get("input[type=search]").type("update");
	});
});
