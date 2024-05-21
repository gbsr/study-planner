import React from "react";
import PrioItem from "./PrioItem";

describe("<PrioItem />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<PrioItem />);
	});
});
