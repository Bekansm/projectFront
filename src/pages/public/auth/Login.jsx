// Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/slices/authSlice.jsx";
import { loginUser } from "../../../services/api/auth.jsx";
import {
	InputField,
	ServerError,
	handleFormSubmit,
} from "../../../services/authService.jsx";

export default function Login() {
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
			loginUser,
			reset,
			dispatch,
			setToken,
			navigate,
			"/"
		);
	};

	return (
		<div className="wrapper">
			<h2 className="wrapper-text">Вход</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
				<button type="submit">Войти</button>
				<ServerError error={serverError} />
			</form>

			<p className="wrapper-text">
				Нет аккаунта?{" "}
				<Link to="/register" className="wrapper-link">
					Зарегистрироваться
				</Link>
			</p>
		</div>
	);
}
