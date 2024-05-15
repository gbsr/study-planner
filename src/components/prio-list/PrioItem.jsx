
const PrioItem = ({ item, num }) => {
	let itemClass = 'item'
	if( item.late ) itemClass += ' due'

	return (
		<div className={itemClass}>
			{num}. {item.text}
		</div>
	)
}
export default PrioItem
