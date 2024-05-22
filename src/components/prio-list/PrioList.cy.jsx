import { getToday } from "../../utils/date";
import { getTodos } from "../../utils/crud";
import PrioItem from "./PrioItem";

describe("<PrioList />", () => {
	it("should render todos for today and two days ahead", () => {
		cy.wrap(getTodos()).then((todos) => {
			const relevantTodos = todos.filter(
				(todo) =>
					todo.dayOfWeek === getToday() || todo.dayOfWeek === getToday() + 1 || todo.dayOfWeek === getToday() + 2
			);

			cy.wait(500); // we wait a bit so the data can be fetched before we render the component

			cy.mount(
				<div>
					{relevantTodos.map((todo, index) => (
						<PrioItem key={todo.id} item={todo} num={index + 1} />
					))}
				</div>
			);
		});
	});
});
