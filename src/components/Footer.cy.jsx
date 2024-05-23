import Footer from "./Footer";

describe("<Footer />", () => {
	it("renders", () => {
		cy.mount(<Footer />);
	});

	it("should render the current done items and the current total items", () => {
		const todos = [
			{ id: 1, done: true },
			{ id: 2, done: false },
			{ id: 3, done: true },
		];

		cy.mount(<Footer todos={todos} />);
		cy.get("footer").contains("Du har klarat av 2 av 3 saker på din lista.");
	});
});
