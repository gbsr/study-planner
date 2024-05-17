import { create } from "zustand";
import { getToday } from "../utils/date.js";

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

	resetTodos: () => set(state => ({ todos: [] })),
}));

export { useStore };