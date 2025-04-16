import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { logout } from "../../redux/slices/authSlice";
import ConfirmModal from "../../components/ConfirmationModal";
import { useDispatch } from "react-redux";
import {
	getUserProfile,
	changeUserPassword,
	deleteUserAccount,
} from "../../services/api/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [user, setUser] = useState({ name: "", email: "" });
	const [serverError, setServerError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleDeleteClick = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const handleConfirm = () => {
		onDeleteAccount();
		setShowModal(false);
		navigate("/");
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		getUserProfile(token)
			.then((data) => {
				setUser({ name: data.name, email: data.email });
			})
			.catch((err) => setServerError(err.message));
	}, []);

	const onChangePassword = async (data) => {
		setServerError("");
		setSuccessMessage("");
		const token = localStorage.getItem("token");

		try {
			await changeUserPassword(token, data);
			setSuccessMessage("Пароль успешно обновлён");
			reset();
		} catch (err) {
			setServerError(err.message);
		}
	};

	const onDeleteAccount = async () => {
		const token = localStorage.getItem("token");

		try {
			await deleteUserAccount(token);
			dispatch(logout());
		} catch (err) {
			setServerError(err.message);
		}
	};

	return (
		<>
			<div className="wrapper">
				<h2 className="wrapper-text">Профиль</h2>

				<div className="profile-info wrapper-text">
					<p>
						<strong>Имя:</strong> {user.name}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
				</div>

				<h3 className="wrapper-text">Сменить пароль</h3>
				<form onSubmit={handleSubmit(onChangePassword)} className="auth-form">
					<div>
						<input
							type="password"
							placeholder="Старый пароль"
							{...register("oldPassword", {
								required: "Введите старый пароль",
							})}
						/>
						{errors.oldPassword && (
							<p className="wrapper-text">{errors.oldPassword.message}</p>
						)}
					</div>
					<div>
						<input
							type="password"
							placeholder="Новый пароль"
							{...register("newPassword", {
								required: "Введите новый пароль",
								minLength: {
									value: 6,
									message: "Минимум 6 символов",
								},
							})}
						/>
						{errors.newPassword && (
							<p className="wrapper-text">{errors.newPassword.message}</p>
						)}
					</div>
					<button type="submit">Сменить пароль</button>
				</form>

				{successMessage && <p className="wrapper-text">{successMessage}</p>}
				{serverError && <p className="wrapper-text">{serverError}</p>}

				<hr style={{ margin: "20px 0" }} />

				<button onClick={handleDeleteClick}>Удалить аккаунт</button>
			</div>

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
