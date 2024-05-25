import { create } from "zustand";
import { getToday, weekdays } from "../utils/date.js";
import { addTodo as addTodoToFirestore, updateTodo, getTodos, deleteTodo } from "../utils/crud.js";
import { toggleTodo as toggleTodoInDatabase } from "../utils/crud.js";

const useStore = create(set => ({
	todos: [],
	todayName: getToday(),

	getAllTodos: async () => {
		const todos = await getTodos();
		set({ todos });
	},

	restartWeek: async () => {
		const todos = await getTodos();
		const updatedTodos = await Promise.all(todos.map(async todo => {
			if (todo.done) {
				todo.done = false;
				await updateTodo(todo);
			}
			return todo;
		}));
		set({ todos: updatedTodos });
	},

	updateTodos: async (id, newTitle, newDesc) => set((state) => {
		const todoIndex = state.todos.findIndex((todo) => todo.id === id);

		if (todoIndex === -1) {
			return { todos: state.todos };
		}

		const updatedTodo = { ...state.todos[todoIndex], title: newTitle, desc: newDesc };
		updateTodo(updatedTodo);

		const updatedTodos = [
			...state.todos.slice(0, todoIndex),
			updatedTodo,
			...state.todos.slice(todoIndex + 1),
		];

		return { todos: updatedTodos };
	}),

	toggleTodo: id => set(state => {
		const updatedTodos = state.todos.map(t => {
			if (t.id === id) {
				const updatedTodo = { ...t, done: !t.done };
				toggleTodoInDatabase(id);
				return updatedTodo;
			} else {
				return t;
			}
		});

		return {
			...state,
			todos: updatedTodos,
		};
	}),

	addTodo: async todo => {
		await addTodoToFirestore(todo);
		const todos = await getTodos();
		set({ todos });
	},

	// TODO: Refactor this at some point maybe(?)
	postponeTodo: id => set(state => {
		const updatedTodos = state.todos.map(t => {
			if (t.id === id) {
				const currentDayIndex = weekdays.indexOf(t.dayOfWeek);
				const updatedDayOfWeekIndex = (currentDayIndex + 1) % 7;
				const updatedDayOfWeek = weekdays[updatedDayOfWeekIndex];
				const updatedTodo = { ...t, dayOfWeek: updatedDayOfWeek };
				updateTodo(updatedTodo);
				return updatedTodo;
			} else {
				return t;
			}
		});
		return { ...state, todos: updatedTodos };
	}),

	prioritizeTodo: id => set(state => {
		const updatedTodos = state.todos.map(t => {
			if (t.id === id) {
				const currentDayIndex = weekdays.indexOf(t.dayOfWeek);
				const updatedDayOfWeekIndex = (currentDayIndex - 1 + 7) % 7;
				const updatedDayOfWeek = weekdays[updatedDayOfWeekIndex];
				const updatedTodo = { ...t, dayOfWeek: updatedDayOfWeek };
				updateTodo(updatedTodo);
				return updatedTodo;
			} else {
				return t;
			}
		});
		return { ...state, todos: updatedTodos };
	}),

	deleteTodo: (id) => set(async (state) => {
		const updatedTodos = state.todos.filter(t => t.id !== id);
		await deleteTodo({ id });
		return { todos: updatedTodos };
	}),

	searchTodoItem(todos, search) {
		const result = todos.filter(t => t.title.includes(search));
		return result;
	},

	// TODO: take a look at this later and actually implment it properly
	resetTodos: () => set(state => ({ todos: [] })),
}));

export { useStore };