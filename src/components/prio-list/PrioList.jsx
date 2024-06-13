import { useEffect, useState } from "react";
import PrioItem from "./PrioItem";
import { useStore } from "../../data/store.js";
import { weekdays } from "../../utils/date";

const PrioList = ({ handleDelete, handleUpdate, update }) => {
	const { todos, getAllTodos } = useStore((state) => ({
		todos: state.todos,
		getAllTodos: state.getAllTodos,
	}));
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const loadTodos = async () => {
			setLoading(true);
			await getAllTodos();
			setLoading(false);
		};

		loadTodos();
	}, [getAllTodos, update]);

	const searchTodos = (e) => {
		setSearchTerm(e.target.value);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!Array.isArray(todos)) {
		console.error("todos is not an array", todos);
		return <div>Error: todos is not an array</div>;
	}

	const items = todos.filter((todo) => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));

	const groupedItems = weekdays.reduce((groups, day) => {
		groups[day] = items.filter((item) => item.dayOfWeek === day);
		return groups;
	}, {});

	return (
		<div className="prio-list">
			<h2> Vad ska jag göra nu? </h2>
			<div className="list-container">
				<input type="search" placeholder="Filtrera uppgifter" onChange={searchTodos} />

				{weekdays.map((day) => (
					<div key={day}>
						<h3>{day}</h3>
						<div className="prio-items">
							{groupedItems[day].map((item, index) => (
								<PrioItem
									key={item.id}
									item={item}
									title={item.title}
									num={index + 1}
									handleUpdate={handleUpdate}
									handleDelete={handleDelete}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PrioList;
