import { useStore } from "../../data/store";
import { useState, useEffect } from "react";

const PrioItem = ({ item, num }) => {
	const { title, desc, late, done } = item;
	const toggleTodo = useStore((state) => state.toggleTodo);
	const postponeTodo = useStore((state) => state.postponeTodo);
	const prioritizeItem = useStore((state) => state.prioritizeTodo);
	const deleteTodo = useStore((state) => state.deleteTodo);
	const updateTodos = useStore((state) => state.updateTodos);
	const [isEditing, setIsEditing] = useState(false);
	const [editedItem, setEditedItem] = useState(item);

	useEffect(() => {
		setEditedItem(item);
	}, [item]);

	const handleDone = () => {
		toggleTodo(item.id);
		console.log("Toggling todo", item.id);
		console.log("Done?", done);
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

	const handleDelete = () => {
		deleteTodo(item.id);
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
				<button className="btn complete" onClick={handleDone}>
					{done ? "Inte Klar" : "Klar"}
				</button>
				<button className="btn delete" onClick={handleDelete}>
					Ta bort
				</button>
				{isEditing ? (
					<button className="btn edit" onClick={handleSave}>
						Spara
					</button>
				) : (
					<button className="btn edit" onClick={handleEdit}>
						Ändra
					</button>
				)}
				<button className="btn postpone" onClick={handlePostpone}>
					Skjut Upp
				</button>
				<button className="btn prioritize" onClick={handlePrioritize}>
					Prioritera
				</button>
			</div>
		</div>
	);
};

export default PrioItem;
