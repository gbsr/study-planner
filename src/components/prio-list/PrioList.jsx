import { useEffect } from "react";
import PrioItem from "./PrioItem";
import { useStore } from "../../data/store.js";
import { fetchAndUpdateTodos } from "../../data/data.js";
import { weekdays } from "../../utils/date";

const PrioList = () => {
	const { todos, updateTodos } = useStore((state) => ({ todos: state.todos, updateTodos: state.updateTodos }));

	useEffect(() => {
		fetchAndUpdateTodos().then((fetchedTodos) => {
			updateTodos(fetchedTodos);
		});
	}, [updateTodos]);

	console.log("Lista " + todos.length + " grejer att göra");
	const items = todos.filter((t) => {
		const currentDayOfWeek = weekdays[(new Date().getDay() + 6) % 7];
		const nextTwoDays = [weekdays[currentDayOfWeek % 7], weekdays[(currentDayOfWeek + 1) % 7]];
		return t.dayOfWeek === currentDayOfWeek || nextTwoDays.includes(t.dayOfWeek);
	});

	const groupedItems = items.reduce((groups, item) => {
		const key = item.dayOfWeek;
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(item);
		return groups;
	}, {});

	return (
		<div className="prio-list">
			<h2> Vad ska jag göra nu? </h2>
			<div className="list-container">
				<input type="search" placeholder="Filtrera uppgifter" />

				{Object.entries(groupedItems).map(([day, items]) => (
					<div key={day}>
						<h3>{weekdays[day - 1]}</h3>
						<div className="prio-items">
							{items.map((item, index) => (
								<PrioItem key={item.id} item={item} num={index + 1} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PrioList;
