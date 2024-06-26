import { db } from "./firestore";
import { collection, getDocs, query, orderBy, addDoc, doc, updateDoc, deleteDoc, } from "firebase/firestore";

async function getTodos() {

	const todos = [];
	try {
		// we use query here so we can order by date ^^
		const todosQuery = query(collection(db, "todos"), orderBy("date"));
		const querySnapshot = await getDocs(todosQuery);
		querySnapshot.forEach((doc) => {
			todos.push({ id: doc.id, ...doc.data() });
		});
	} catch (error) {
		console.error("Error getting documents: ", error);
	}
	console.log('Todos:', todos);
	return todos;
}

async function addTodo(todo) {
	const { title, desc, done, late, date, dayOfWeek } = todo;
	const todoDoc = {
		title: title,
		desc: desc,
		done: done,
		late: late,
		date: date,
		dayOfWeek: dayOfWeek,
	};
	try {
		await addDoc(collection(db, "todos"), todoDoc);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}

async function updateTodo(todo) {
	const { id, title, desc, done, late, date, dayOfWeek } = todo;
	if (!id) {
		console.error("Error: No ID provided for update");
		return;
	}
	const todoDoc = {
		title: title,
		desc: desc,
		done: done,
		late: late,
		date: date,
		dayOfWeek: dayOfWeek,
	};
	try {
		const todoRef = doc(db, "todos", id);
		await updateDoc(todoRef, todoDoc);
		console.log('' + id + ' updated');
		console.log('todo done status set: ', done);
	} catch (error) {
		console.error("Error updating document: ", error);
	}
}

async function deleteTodo(todo) {
	const { id } = todo;
	try {
		const todoRef = doc(db, "todos", id);
		await deleteDoc(todoRef);
		console.log('' + id + ' deleted');
	} catch (error) {
		console.error("Error deleting document: ", error);
	}
}

async function toggleTodo(id) {
	const todos = await getTodos();
	const todo = todos.find((todo) => todo.id === id);
	const updatedTodo = { ...todo, done: !todo.done };
	await updateTodo(updatedTodo);
	return updatedTodo;
}

export { addTodo, getTodos, updateTodo, deleteTodo, toggleTodo };

