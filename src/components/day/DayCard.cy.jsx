import { useStore } from "../../data/store";
import DayCard from "./DayCard";

describe("DayCard", () => {
	it("should render", () => {
		cy.mount(<DayCard />);
	});

	it("should add a new todo", () => {
		cy.mount(<DayCard />);
		const testTitle = "Test Title";
		const testDescription = "Test Description";
		const testDay = "Monday";

		cy.get("input[name=title]").type(testTitle);
		cy.get("textarea[name=desc]").type(testDescription);
		cy.get("input[name=day]").type(testDay, { force: true });
		cy.get("button[type=submit]")
			.click()
			.then(() => {
				cy.wrap(useStore.getState().addTodo).invoke("call", null, {
					title: testTitle,
					desc: testDescription,
					day: testDay,
					done: false,
				});
				cy.wrap(useStore)
					.invoke("getState")
					.its("todos")
					.should("have.length.greaterThan", 0)
					.then((todos) => {
						expect(todos[0].title).to.equal(testTitle);
						expect(todos[0].desc).to.equal(testDescription);
						expect(todos[0].day).to.equal(testDay);
						expect(todos[0].done).to.be.false;
					});
			});
	});
});
