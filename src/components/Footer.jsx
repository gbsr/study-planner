import { getToday, getCurrentDate } from "../utils/date";
import { useStore } from "../data/store";

const Footer = ({ todos: todosProp }) => {
	const todosFromStore = useStore((state) => state.todos);
	let todos = todosProp || todosFromStore;

	const doneItems = todos.filter((todo) => todo.done).length;
	const allItems = todos.length;

	const currentDay = getToday();
	const currentDate = getCurrentDate();

	return (
		<footer>
			<div>
				Idag är det: <b>{currentDay}</b>, <b>{currentDate}</b>
				<p>
					Du har klarat av <b>{doneItems}</b> av <b>{allItems}</b> saker på din lista.
				</p>
			</div>
			<p> Studieguide | 2024 </p>
		</footer>
	);
};

export default Footer;
