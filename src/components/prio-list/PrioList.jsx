import { useEffect, useState } from "react";
import PrioItem from "./PrioItem";
import { useStore } from "../../data/store.js";
import { weekdays } from "../../utils/date";

const PrioList = () => {
	const { todos, getAllTodos, updateTodos } = useStore((state) => ({
		todos: state.todos,
		getAllTodos: state.getAllTodos,
		updateTodos: state.updateTodos,
	}));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllTodos()
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching todos:", error);
				setLoading(false);
			});
	}, [getAllTodos]);

	useEffect(() => {
		console.log("todos after fetch:", todos);
	}, [todos]);

	const handleEdit = (id, newText) => {
		updateTodos(id, newText);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!Array.isArray(todos)) {
		console.error("todos is not an array", todos);
		return <div>Error: todos is not an array</div>;
	}

	// ...

	const items = todos;

	const groupedItems = weekdays.reduce((groups, day) => {
		groups[day] = items.filter((item) => item.dayOfWeek === day);
		return groups;
	}, {});

	// ...

	return (
		<div className="prio-list">
			<h2> Vad ska jag göra nu? </h2>
			<div className="list-container">
				<input type="search" placeholder="Filtrera uppgifter" />

				{weekdays.map((day) => (
					<div key={day}>
						<h3>{day}</h3>
						<div className="prio-items">
							{groupedItems[day].map((item, index) => (
								<PrioItem key={item.id} item={item} title={item.title} num={index + 1} onSave={handleEdit} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PrioList;
