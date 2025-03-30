import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice.jsx";

export default function Header() {
	const dispatch = useDispatch();
	const isLightTheme = useSelector((state) => state.theme.isLightTheme);

	return (
		<nav className="nav">
			<Link to="/weather" className="nav-link">
				Погода
			</Link>
			<Link to="/time" className="nav-link">
				Время
			</Link>
			<div className="theme">
				<div
					className={classNames("toggle", { toggle__active: isLightTheme })}
					onClick={() => dispatch(toggleTheme())}
				>
					<span className="toggle-round"></span>
				</div>
			</div>
		</nav>
	);
}
