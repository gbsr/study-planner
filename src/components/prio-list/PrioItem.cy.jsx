import PrioList from "./PrioList";

describe("<PrioList />", () => {
	it("should mount without crashing", () => {
		cy.mount(<PrioList />);
	});
});
