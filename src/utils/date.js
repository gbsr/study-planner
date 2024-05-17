const weekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

function getToday() {
	const dayIndex = new Date().getDay();
	// Because we start on monday, which is 1
	const adjustedDayIndex = (dayIndex === 0) ? 6 : dayIndex - 1;
	return weekdays[adjustedDayIndex];
}

function getCurrentDate() {
	return new Date().toISOString().slice(0, 10);
}

// might come in handy later
function getTomorrow() {
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	return tomorrow.getDay();
}

export { getToday, getCurrentDate, getTomorrow, weekdays };