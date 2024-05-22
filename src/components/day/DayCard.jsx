import Item from "./Item";
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
		const done = e.target.done.checked;
		const late = e.target.late.checked;
		const day = e.target.day.value;
		const date = new Date().toISOString().slice(0, 10); // Get current date, in case we need to sort date later
		const newTodo = { title, desc, done, late, day, date };
		addTodo(newTodo);
	};

	return (
		<div className="day">
			<h2> {week[dayOfWeek - 1]} </h2>

			{day?.map((item) => (
				<Item key={item.id} item={item} />
			))}

			<div className="controls">
				<form onSubmit={handleSubmit}>
					<label>Title</label>
					<input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

					<label>Uppgift</label>
					<textarea style={{ height: 100 }} name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />

					<input type="hidden" name="day" value={day} />

					<label>
						Klar?
						<input type="checkbox" name="done" />
					</label>

					<label>
						Skjut Upp till Senare
						<input type="checkbox" name="late" />
					</label>

					<button type="submit">Ny uppgift</button>
				</form>
			</div>
		</div>
	);
};

export default DayCard;
