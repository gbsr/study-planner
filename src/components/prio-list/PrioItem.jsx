import { useStore } from "../../data/store";

const PrioItem = ({ item, num }) => {
	const { title, desc, late, done } = item;
	const toggleTodo = useStore((state) => state.toggleTodo);

	const handleDone = () => {
		console.log("Marking as done");
		toggleTodo(item.id);
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
				<button className="btn">Skjut upp</button>
			</div>
		</div>
	);
};

export default PrioItem;
