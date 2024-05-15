import { create } from "zustand";
import { todos } from './data.js'
import { getToday } from "../utils/date.js";


const useStore = create(set => ({
	todos: todos,  // TODO: "todos" är data som du kan använda under utvecklingen - byt ut den mot din egen testdata

	todayName: getToday(),
	// TODO: du behöver en funktion setTodayName för att kunna testa appen med olika veckodagar


	toggleTodo: id => set(state => {
		// Det är möjligt att det finns en liiiiiten bug här, som man i så fall skulle upptäcka när man testar 😇
		return {
			...state,
			todos: state.todos.map(t => {
				if( t.id === id ) {
					return { done: !t.done, ...t }
				} else {
					return t
				}
			})
		}
	}),

	resetTodos: () => set(state => ({ todos: [] })),

	// TODO: lägg till en funktion "setTodos" så att du kan ändra innehållet i store från dina testfiler

}))

export { useStore }
