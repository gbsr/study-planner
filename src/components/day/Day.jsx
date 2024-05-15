import Item from "./Item"

// När du testar, kom ihåg att rendera komponenten med olika props
const Day = ({ day }) => {
	// TODO: implement rest of week
	const dayName = 'Måndag'

	return (
		<div className="day">
			<h2> {dayName} </h2>

			{day.map(item => (
				<Item key={item.id} item={item} />
			))}

			<div className="controls">
				<button> Ny uppgift </button>
			</div>
		</div>
	)
}

export default Day
