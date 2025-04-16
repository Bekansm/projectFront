import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
	const [user, setUser] = useState({ name: "", email: "" });
	const [serverError, setServerError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

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
		const confirmDelete = window.confirm(
			"Вы уверены, что хотите удалить аккаунт?"
		);
		if (!confirmDelete) return;

		const token = localStorage.getItem("token");
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

			localStorage.removeItem("token");
			window.location.href = "/login";
		} catch (err) {
			setServerError(err.message);
		}
	};

	return (
		<div className="wrapper">
			<h2 className="wrapper-text">Профиль</h2>

			<div className="profile-info">
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
						<p className="error-text">{errors.oldPassword.message}</p>
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
						<p className="error-text">{errors.newPassword.message}</p>
					)}
				</div>
				<button type="submit">Сменить пароль</button>
			</form>

			{successMessage && <p className="success-text">{successMessage}</p>}
			{serverError && <p className="error-text">{serverError}</p>}

			<hr style={{ margin: "20px 0" }} />

			<button onClick={onDeleteAccount} className="danger-button">
				Удалить аккаунт
			</button>
		</div>
	);
}
