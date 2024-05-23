import PrioList from "./PrioList";
import { useStore } from "../../data/store";

describe("<PrioList />", () => {
	it("should mount without crashing", () => {
		cy.stub(useStore, "getState").returns({
			getAllTodos: cy.stub().as("getAllTodos"),
		});

		cy.mount(<PrioList />);
	});

	it("should filter todos by search term", () => {
		cy.stub(useStore, "getState").returns({
			getAllTodos: cy
				.stub()
				.returns([
					{ id: 1, title: "test", dayOfWeek: "Monday" },
					{ id: 2, title: "testing", dayOfWeek: "Tuesday" },
					{ id: 3, title: "test", dayOfWeek: "Wednesday" },
				])
				.as("getAllTodos"),
		});

		cy.mount(<PrioList />);
		cy.get("input[type='search']").type("test");
		cy.get(".prio-items").should("contain", "test");
		cy.get(".prio-items").should("not.contain", "testing");
	});
});
