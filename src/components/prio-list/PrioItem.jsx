import { useStore } from "../../data/store";
import { useState, useEffect } from "react";

const PrioItem = ({ item, num }) => {
	const { title, desc, late, done } = item;
	const toggleTodo = useStore((state) => state.toggleTodo);
	const postponeTodo = useStore((state) => state.postponeTodo);
	const prioritizeItem = useStore((state) => state.prioritizeTodo);
	const updateTodos = useStore((state) => state.updateTodos);
	const [isEditing, setIsEditing] = useState(false);
	const [editedItem, setEditedItem] = useState(item);

	useEffect(() => {
		setEditedItem(item);
	}, [item]);

	const handleDone = () => {
		toggleTodo(item.id);
	};

	const handlePostpone = () => {
		postponeTodo(item.id);
	};

	const handlePrioritize = () => {
		prioritizeItem(item.id);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		setIsEditing(false);
		updateTodos(editedItem.id, editedItem.title, editedItem.desc);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedItem({ ...editedItem, [name]: value });
	};

	return (
		<div className={`prio-item ${late ? "late" : ""} ${done ? "done" : ""}`}>
			<h3>
				{isEditing ? (
					<input type="text" name="title" value={editedItem.title} onChange={handleChange} />
				) : (
					`${num}: ${title}`
				)}
			</h3>
			<p>{isEditing ? <textarea name="desc" value={editedItem.desc} onChange={handleChange} /> : desc}</p>
			<div className="prio-controls">
				<button className="btn" onClick={handleDone}>
					{done ? "Inte Klar" : "Klar"}
				</button>
				<button className="btn">Ta bort</button>
				{isEditing ? (
					<button className="btn edit" onClick={handleSave}>
						Save
					</button>
				) : (
					<button className="btn edit" onClick={handleEdit}>
						Ändra
					</button>
				)}
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
