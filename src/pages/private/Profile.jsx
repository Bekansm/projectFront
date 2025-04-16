import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { logout } from "../../redux/slices/authSlice";
import ConfirmModal from "../../components/ConfirmationModal";
import { useDispatch } from "react-redux";

export default function Profile() {
	const dispatch = useDispatch();
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
		// Загрузка данных пользователя с сервера
		const token = localStorage.getItem("token");
		fetch("http://localhost:8000/profile", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.name && data.email) {
					setUser({ name: data.name, email: data.email });
				} else {
					throw new Error("Ошибка загрузки профиля");
				}
			})
			.catch((err) => setServerError(err.message));
	}, []);

	const onChangePassword = async (data) => {
		setServerError("");
		setSuccessMessage("");
		const token = localStorage.getItem("token");

		try {
			const res = await fetch("http://localhost:8000/auth/change-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.message || "Ошибка смены пароля");
			}

			setSuccessMessage("Пароль успешно обновлён");
			reset();
		} catch (err) {
			setServerError(err.message);
		}
	};

	const onDeleteAccount = async () => {
		try {
			const res = await fetch("http://localhost:8000/auth/delete", {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				const result = await res.json();
				throw new Error(result.message || "Ошибка при удалении аккаунта");
			}
		} catch (err) {
			setServerError(err.message);
		}
		dispatch(logout());
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
