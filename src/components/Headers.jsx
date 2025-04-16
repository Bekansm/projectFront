import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice.jsx";
import { logout } from "../redux/slices/authSlice";

export default function Header() {
	const dispatch = useDispatch();
	const isLightTheme = useSelector((state) => state.theme.isLightTheme);
	const token = useSelector((state) => state.auth.token); // Токен из Redux
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<nav className="nav">
			<Link to="/home" className="nav-link">
				Главная
			</Link>
			<Link to="/weather" className="nav-link">
				Погода
			</Link>
			<Link to="/time" className="nav-link">
				Время
			</Link>
			{token && (
				<Link to="/profile" className="nav-link">
					Профиль
				</Link>
			)}
			<div className="theme">
				<div
					className={classNames("toggle", { toggle__active: isLightTheme })}
					onClick={() => dispatch(toggleTheme())}
				>
					<span className="toggle-round"></span>
				</div>
				{token ? (
					<Link to="/">
						<button onClick={handleLogout}>Выход</button>
					</Link>
				) : (
					<Link to="/login">
						<button>Вход</button>
					</Link>
				)}
			</div>
		</nav>
	);
}
