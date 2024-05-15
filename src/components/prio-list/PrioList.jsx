import PrioItem from "./PrioItem"
import { useStore } from '../../data/store.js'

const PrioList = () => {
	const todos = useStore(state => state.todos)
	const items = todos.filter(t => !t.done)

	return (
		<div className="prio-list">
			<h2> Vad ska jag göra nu? </h2>
			<div className="list-container">
				<input type="search" placeholder="Filtrera uppgifter" />

				<div className="prio-items">
					{items.map((item, index) => (
						<PrioItem key={item.id} item={item} num={index+1} />
					))}
				</div>

			</div>
		</div>
	)
}
export default PrioList
