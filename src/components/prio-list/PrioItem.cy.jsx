import PrioItem from "./PrioItem";
import { useStore } from "../../data/store";

const mockItem = {
	num: 1,
	id: 1,
	title: "Test Title",
	desc: "Test Description",
	done: false,
};

// TODO: Refactor this because jesuschrist this is a lot of repetition haha!

describe("PrioItem", () => {
	it("should mount without crashing", () => {
		cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
	});

	it("should edit an item", () => {
		cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
		cy.get(".prio-item .btn.edit").contains("Ändra").click();
		cy.get('.prio-item input[name="title"]').clear().type("New Title");
		cy.get('.prio-item textarea[name="desc"]').clear().type("New Description");

		cy.get(".prio-item .btn.edit")
			.contains("Save")
			.click()
			.then(() => {
				mockItem.title = "New Title";
				mockItem.desc = "New Description";
				// remount to rerender
				cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
			});

		cy.wait(1000);
		cy.get(".prio-item h3").should("contain", "New Title");
		cy.get(".prio-item p").should("contain", "New Description");
	});

	it("should mark an item as done", () => {
		// because we use store we need to stub the function
		const toggleTodo = cy.stub().as("toggleTodo");
		useStore.getState().toggleTodo = toggleTodo;

		cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
		cy.get(".prio-item .btn.done").click();
		cy.wait(1000);
		cy.wrap(toggleTodo).should("have.been.calledOnce");
	});

	it("should postpone an item", () => {
		// same here then
		const postponeTodo = cy.stub().as("postponeTodo");
		useStore.getState().postponeTodo = postponeTodo;

		cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
		cy.get(".prio-item .btn.postpone").click();
		cy.wait(1000);
		cy.wrap(postponeTodo).should("have.been.calledOnce");
	});

	it("should prioritize an item", () => {
		// aaaaaaand here
		const prioritizeTodo = cy.stub().as("prioritizeTodo");
		useStore.getState().prioritizeTodo = prioritizeTodo;

		cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
		cy.get(".prio-item .btn.prioritize").click();
		cy.wait(1000);
		cy.wrap(prioritizeTodo).should("have.been.calledOnce");
	});

	it("should delete an item", () => {
		// and of course, here too
		const deleteTodo = cy.stub().as("deleteTodo");
		useStore.getState().deleteTodo = deleteTodo;

		cy.mount(<PrioItem item={mockItem} num={mockItem.num} />);
		cy.get(".prio-item .btn.delete").click();
		cy.wait(1000);
		cy.wrap(deleteTodo).should("have.been.calledOnce");
	});
});
