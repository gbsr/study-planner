import { getTodos } from '../utils/crud';

export async function fetchAndUpdateTodos() {
	try {
		const fetchedTodos = await getTodos();
		return fetchedTodos;
	} catch (error) {
		console.error("Error getting todos: ", error);
	}
}