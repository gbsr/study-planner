const weekdays = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']

// Den här funktionen är beroende av JavaScripts Date-modul och är svår att testa separat. Du behöver inte skriva enhetstest för den.
function getToday() {
	return weekdays[new Date().getDay()]
}

export { getToday }
