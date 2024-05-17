import { useStore } from "../../data/store";

const PrioItem = ({ item, num }) => {
	const { title, desc, late, done } = item;
	const toggleTodo = useStore((state) => state.toggleTodo);
	const postponeTodo = useStore((state) => state.postponeTodo);
	const prioritizeItem = useStore((state) => state.prioritizeTodo);

	const handleDone = () => {
		console.log("Marking as done");
		toggleTodo(item.id);
	};

	const handlePostpone = () => {
		console.log("Postponing");
		postponeTodo(item.id);
	};

	const handlePrioritize = () => {
		console.log("Prioritizing");
		prioritizeItem(item.id);
	};

	return (
		<div className={`prio-item ${late ? "late" : ""} ${done ? "done" : ""}`}>
			<h3>
				{num}: {title}
			</h3>
			<p>{desc}</p>
			<div className="prio-controls">
				<button className="btn" onClick={handleDone}>
					{done ? "Inte Klar" : "Klar"}
				</button>
				<button className="btn">Ta bort</button>
				<button className="btn">Ändra</button>
				<button className="btn" onClick={handlePostpone}>
					Skjut Upp
				</button>
				<button className="btn" onClick={handlePrioritize}>
					Prioritera
				</button>
			</div>
		</div>
	);
};

export default PrioItem;
