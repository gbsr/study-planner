

export function splitTodosIntoDays(todos) {
	const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
	const result = days.map(day => todos.filter(t => t.day === day));
	return result;
}

export function deleteTodoItem(todos, id) {
	const result = todos.filter(t => t.id !== id);
	return result;
}

export function editTodoItem(todos, id, newTodo) {
	const result = todos.map(t => {
		if (t.id === id) {
			return newTodo;
		}
		return t;
	});
	return result;
}

export function searchTodoItem(todos, search) {
	const result = todos.filter(t => t.title.includes(search));
	return result;
}

export function snoozeItem(todos, id) {
	const result = todos.map(t => {
		if (t.id === id) {
			return { ...t, day: 'tomorrow' };
		}
		return t;
	});
	return result;
}

export function startNextWeekWithAllTodosUnfinished(todos) {

	const weekNumber = new Date().getWeek();
	const thisWeekNumber = new Date().getWeek();

	if (weekNumber > thisWeekNumber) {
		const result = todos.map(t => {
			return { ...t, done: false };
		});
		return result;
	}
}

export function getWeek() {
	const today = new Date();
	const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

	/*
	get past days of the year, and plus 1 because the first day of the year is not 0. 
	(86400000 is the milliseconds of a day.)
	then divide by 7 to get the week number.
	
	*/

	const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
	return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Tips! Du kan få användning för funktioner som:
// + kopierar en lista och byter plats på två element (snooze)
// + lägger till ett element på en viss plats i en lista
// https://www.w3schools.com/jsref/jsref_splice.asp
// https://www.freecodecamp.org/news/javascript-splice-how-to-use-the-splice-js-array-method/

