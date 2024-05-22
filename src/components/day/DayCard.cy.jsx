import DayCard from "./DayCard";
import PrioList from "../prio-list/PrioList";

describe("<DayCard />", () => {
	it("renders", () => {
		cy.mount(<DayCard />);
	});

	it("can create a new todo", () => {
		const testTitle = "Test Title";
		cy.mount(<DayCard />);
		cy.get("input[name=title]").type(testTitle);
		cy.get("textarea[name=desc]").type("Test Description");
		cy.get("input[name=done]").check();
		cy.get("input[name=late]").check();
		cy.get("input[name=day]").type("Monday", { force: true });
		cy.get("button[type=submit]")
			.click()
			.then(() => {
				cy.mount(<PrioList />);
			});
	});
});
