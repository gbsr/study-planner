import { getTodos } from '../utils/crud';

export async function fetchAndUpdateTodos() {
	try {
		const todos = await getTodos();
		return Array.isArray(todos) ? todos : [];
	} catch (error) {
		console.error("Error fetching todos:", error);
		return [];
	}
}
