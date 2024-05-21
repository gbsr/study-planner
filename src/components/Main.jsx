import { useStore } from "../data/store.js";
import DayCard from "./day/DayCard";
import PrioList from "./prio-list/PrioList.jsx";
import { splitTodosIntoDays } from "../utils/list.js";

const Main = () => {
	const todos = useStore((state) => state.todos);
	const days = splitTodosIntoDays(todos);

	return (
		<main>
			<div className="day-view">
				{days.map((day, index) => {
					const dayOfWeek = (index % 7) + 1; // use modulo to calc day of week (add one because zero-based of course)
					return <DayCard day={day} dayOfWeek={dayOfWeek} key={index} />;
				})}
			</div>

			<hr />

			<PrioList />
		</main>
	);
};

export default Main;
