import { create } from "zustand";
import { getToday } from "../utils/date.js";
import { updateTodo } from "../utils/crud.js";

const useStore = create(set => ({
	todos: [],

	todayName: getToday(),

	updateTodos: (todos) => set({ todos }),

	toggleTodo: id => set(state => {
		return {
			...state,
			todos: state.todos.map(t => {
				if (t.id === id) {
					return { ...t, done: !t.done };
				} else {
					return t;
				}
			})
		};
	}),


	// TODO: Refactor this at some point maybe(?)

	postponeTodo: id => set(state => {
		const updatedTodos = state.todos.map(t => {
			if (t.id === id) {
				const updatedDayOfWeek = t.dayOfWeek === 0 ? 6 : t.dayOfWeek + 1;
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
				const updatedDayOfWeek = t.dayOfWeek === 0 ? 6 : t.dayOfWeek - 1;
				const updatedTodo = { ...t, dayOfWeek: updatedDayOfWeek };
				updateTodo(updatedTodo);
				return updatedTodo;
			} else {
				return t;
			}
		});
		return { ...state, todos: updatedTodos };
	}),

	resetTodos: () => set(state => ({ todos: [] })),
}));

export { useStore };