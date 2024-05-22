import { create } from "zustand";
import { getToday, weekdays } from "../utils/date.js";
import { addTodo, updateTodo } from "../utils/crud.js";

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

	addTodo: todo => set(state => {
		addTodo(todo);
		return { ...state, todos: [...state.todos, todo] };
	}),


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

	// TODO: take a look at this later and actually implment it properly
	resetTodos: () => set(state => ({ todos: [] })),
}));

export { useStore };