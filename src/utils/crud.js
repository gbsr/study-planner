import { db } from "./firestore";
import { collection, getDocs, query, orderBy, addDoc, doc, updateDoc } from "firebase/firestore";

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
	} catch (error) {
		console.error("Error updating document: ", error);
	}
}

export { addTodo, getTodos, updateTodo };

