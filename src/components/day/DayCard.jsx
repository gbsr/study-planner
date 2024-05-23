import { addTodo } from "../../utils/crud";
import { useState } from "react";
import { weekdays } from "../../utils/date";

const DayCard = ({ day, dayOfWeek }) => {
	const week = weekdays;
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Desc value:", desc);
		console.log("day of week:", dayOfWeek);
		const done = false;
		const late = false;
		const date = new Date().toISOString().slice(0, 10); // Get current date, in case we need to sort date later

		if (dayOfWeek < 1 || dayOfWeek > 7) {
			console.error("Invalid dayOfWeek:", dayOfWeek);
			return;
		}

		const dayName = week[dayOfWeek - 1];
		const newTodo = { title, desc, done, late, day, dayOfWeek: dayName, date };
		addTodo(newTodo);
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
