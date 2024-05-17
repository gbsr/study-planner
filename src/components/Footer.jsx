import { getToday } from "../utils/date";
import { getCurrentDate } from "../utils/date";
<utils />;

const currentDay = getToday();
const currentDate = getCurrentDate();
const Footer = () => (
	<footer>
		<p>
			Idag är det: <b>{currentDay}</b>, <b>{currentDate}</b>
		</p>
		<p> Studieguide | 2024 </p>
	</footer>
);

export default Footer;
