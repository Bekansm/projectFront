import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice.jsx";
import { logout } from "../redux/slices/authSlice";
import ConfirmModal from "./ConfirmationModal.jsx";
import { useState } from "react";

export default function Header() {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const isLightTheme = useSelector((state) => state.theme.isLightTheme);
	const token = useSelector((state) => state.auth.token); 

	const handleLogoutClick = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const handleConfirm = () => {
		dispatch(logout());
		setShowModal(false);
		navigate("/");
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	// Убираем фокус с после нажатия на кнопки в меню
	const handleLinkClick = (e) => {
		e.target.blur();
	};
	return (
		<>
			<nav className="nav">
				<Link to="/home" className="nav-link" onClick={handleLinkClick}>
					Главная
				</Link>
				<Link to="/weather" className="nav-link" onClick={handleLinkClick}>
					Погода
				</Link>
				<Link to="/time" className="nav-link" onClick={handleLinkClick}>
					Время
				</Link>
				{token && (
					<Link to="/profile" className="nav-link" onClick={handleLinkClick}>
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
						<button onClick={handleLogoutClick}>Выход</button>
					) : (
						<Link to="/login">
							<button>Вход</button>
						</Link>
					)}
				</div>
			</nav>

			{showModal && (
				<ConfirmModal
					isOpen={showModal}
					message="Вы уверены, что хотите выйти?"
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
}
