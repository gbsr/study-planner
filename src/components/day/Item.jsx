const Item = ({ item }) => {
	let itemClass = ''
	if( item.done ) itemClass += 'done'
	if( item.late ) itemClass += 'due'

	const handleChange = () => { /* TODO */ }

	return (
		<div className="item">
			<input type="checkbox" checked={item.done} onChange={handleChange} />
			<label className={itemClass} onClick={handleChange}>
				{item.text}
			</label>
			{/* <span title="Snooza">💤</span> */}
			<span title="Ändra">✍️</span>
			<span title="Ta bort">🗑️</span>
		</div>
	)
}

export default Item
