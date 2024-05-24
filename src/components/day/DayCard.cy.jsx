import { useStore } from "../../data/store";
import DayCard from "./DayCard";

describe("DayCard", () => {
	it("should render", () => {
		const handleUpdate = cy.stub().as("handleUpdate");
		cy.mount(<DayCard handleUpdate={handleUpdate} />);
	});

	it("should add a new todo", () => {
		const handleUpdate = cy.stub().as("handleUpdate");
		const mockDay = "Monday";
		const mockDayOfWeek = 1;
		cy.mount(<DayCard day={mockDay} dayOfWeek={mockDayOfWeek} handleUpdate={handleUpdate} />);

		const testTitle = "Test Title";
		const testDescription = "Test Description";

		// Form stuff with logging
		cy.get("input[name=title]")
			.type(testTitle)
			.then((input) => {
				console.log("Title input value:", input.val());
			});
		cy.get("textarea[name=desc]")
			.type(testDescription)
			.then((textarea) => {
				console.log("Description textarea value:", textarea.val());
			});
		cy.get("input[name=day]")
			.type(mockDay, { force: true })
			.then((input) => {
				console.log("Day input value:", input.val());
			});
		cy.get("button[type=submit]").click();

		// did handleUpdate work?
		cy.get("@handleUpdate").should("have.been.called");
		cy.wait(1000);

		// state stuff
		cy.then(() => {
			const todos = useStore.getState().todos;
			console.log("Todos after addTodo:", todos);
			expect(todos).to.have.length.greaterThan(0);

			const lastTodo = todos[todos.length - 1];
			console.log("Last added todo:", lastTodo);
			expect(lastTodo.title).to.equal(testTitle);
			expect(lastTodo.desc).to.equal(testDescription);
		});
	});
});
