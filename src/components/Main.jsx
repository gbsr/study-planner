import { useStore } from "../data/store.js";
import DayCard from "./day/DayCard";
import PrioList from "./prio-list/PrioList.jsx";
import { splitTodosIntoDays } from "../utils/list.js";
import { useState } from "react";

const Main = () => {
	const [todos, setTodos] = useState(useStore((state) => state.todos));
	const days = splitTodosIntoDays(todos);
	const [update, setUpdate] = useState(false); // Initialize update state

	const handleUpdate = async () => {
		await new Promise((resolve) => setTimeout(resolve, 250));
		setUpdate((prevUpdate) => !prevUpdate);
	};

	const handleDelete = (deletedTodoId) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedTodoId));
		handleUpdate(); // Trigger re-render by toggling the update state
	};

	return (
		<main>
			<div className="day-view">
				{days.map((day, index) => {
					const dayOfWeek = (index % 7) + 1;
					return <DayCard handleUpdate={handleUpdate} day={day} dayOfWeek={dayOfWeek} key={index} />;
				})}
			</div>
			<PrioList todos={todos} handleDelete={handleDelete} handleUpdate={handleUpdate} update={update} />
		</main>
	);
};

export default Main;
