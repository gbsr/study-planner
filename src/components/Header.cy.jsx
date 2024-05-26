import Header from "./Header";

describe("<Header />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<Header />);
	});
});

describe("It restarts the week", () => {
	it("should restart the week", () => {
		cy.mount(<Header />);
		cy.get(".restart-week").click();
	});
});
