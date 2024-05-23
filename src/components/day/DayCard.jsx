import { useState } from "react";
import { useStore } from "../../data/store";
import { weekdays } from "../../utils/date";

const DayCard = ({ handleUpdate, day, dayOfWeek }) => {
	const week = weekdays;
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const addTodo = useStore((state) => state.addTodo);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const done = false;
		const late = false;
		const date = new Date().toISOString().slice(0, 10);

		const dayName = week[dayOfWeek - 1];
		const newTodo = { title, desc, done, late, day, dayOfWeek: dayName, date };
		await addTodo(newTodo);
		console.log("New todo added:", newTodo);
		handleUpdate();
	};

	return (
		<div className="day">
			<h2> {week[dayOfWeek - 1]} </h2>
			<div className="controls">
				<form onSubmit={handleSubmit}>
					<label>Title</label>
					<input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
					<label>Uppgift</label>
					<textarea style={{ height: 100 }} name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
					<input type="hidden" name="day" value={day} />
					<button type="submit">Ny uppgift</button>
				</form>
			</div>
		</div>
	);
};

export default DayCard;
