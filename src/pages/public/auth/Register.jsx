// Register.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/slices/authSlice.jsx";
import { registerUser } from "../../../services/api/auth.jsx";
import {
	InputField,
	ServerError,
	handleFormSubmit,
} from "../../../services/authService.jsx";

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [serverError, setServerError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Для навигации

	const onSubmit = (data) => {
		handleFormSubmit(
			data,
			setServerError,
			registerUser,
			reset,
			dispatch,
			setToken,
			navigate,
			"/login"
		);
	};

	return (
		<div className="wrapper">
			<h2 className="wrapper-text">Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="auth-form">
				<InputField
					type="text"
					name="name"
					placeholder="Имя"
					register={register}
					errors={errors}
					validation={{ required: "Введите имя" }}
				/>
				<InputField
					type="email"
					name="email"
					placeholder="Email"
					register={register}
					errors={errors}
					validation={{
						required: "Введите email",
						pattern: {
							value: /^\S+@\S+$/i,
							message: "Некорректный email",
						},
					}}
				/>
				<InputField
					type="password"
					name="password"
					placeholder="Пароль"
					register={register}
					errors={errors}
					validation={{
						required: "Введите пароль",
						minLength: {
							value: 6,
							message: "Минимум 6 символов",
						},
					}}
				/>
				<button type="submit">Зарегистрироваться</button>
				<ServerError error={serverError} />
			</form>

			<p className="wrapper-text">
				Уже есть аккаунт?{" "}
				<Link to="/login" className="wrapper-link">
					Войти
				</Link>
			</p>
		</div>
	);
}
