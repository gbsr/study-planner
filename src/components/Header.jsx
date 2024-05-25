import { useStore } from "../data/store";

const Header = () => {
	const handleRestartWeek = useStore((state) => state.restartWeek);

	return (
		<header>
			<h1> Min vecka </h1>
			<button className="restart-week" onClick={handleRestartWeek}>
				{" "}
				Starta om vecka{" "}
			</button>
		</header>
	);
};

export default Header;
