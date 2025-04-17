import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";


import {
	getUserProfile,
	updateUsername,
	updateEmail,
} from "../../services/api/auth";

import ConfirmModal from "../../components/ConfirmationModal";
import { InputField,ServerError } from "../../services/authService";


export default function EditProfile() {
	const token = useSelector((state) => state.auth.token); 
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [serverError, setServerError] = useState("");
	const pendingDataRef = useRef(null); 

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {

		getUserProfile(token)
			.then((data) => {
				reset({
					name: data.username,
					email: data.email,
				});
			})
			.catch((err) => setServerError(err.message));
	}, [reset]);

	const handleSaveClick = (data) => {
		pendingDataRef.current = data;
		setShowModal(true);
	};

	const handleConfirm = async () => {
		try {
	
			const { name, email } = pendingDataRef.current;

			await updateUsername(token, name);
			await updateEmail(token, email);

			navigate("/profile");
		} catch (err) {
			setServerError(err.message);
		} finally {
			setShowModal(false);
		}
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="wrapper">
				<h2 className="wrapper-text">Изменить профиль</h2>

				<form
					className="profile-info wrapper-text"
					onSubmit={handleSubmit(handleSaveClick)}
				>
					<InputField
						type="text"
						name="name"
						placeholder="Имя"
						register={register}
						errors={errors}
						validation={{ required: "Введите имя" }}
					/>
<br />
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
<br />
					<ServerError error={serverError} />
			

					
					<button type="submit">Сохранить</button>
					<p/>
					<button onClick={() => navigate(-1)}>Отменить</button>
					
				</form>
			</div>

			{showModal && (
				<ConfirmModal
					isOpen={showModal}
					message="Вы уверены, что хотите сохранить изменения?"
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
}
