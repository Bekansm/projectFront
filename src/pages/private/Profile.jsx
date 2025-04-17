import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { logout } from "../../redux/slices/authSlice";
import ConfirmModal from "../../components/ConfirmationModal";
import { useDispatch } from "react-redux";
import {
	getUserProfile,
	deleteUserAccount,
} from "../../services/api/auth";
import { Link, useNavigate } from "react-router-dom";

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

	const handleClick = (e) => {
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
				setUser({ name: data.username, email: data.email });
			})
			.catch((err) => setServerError(err.message));
	}, []);

	

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

			
				<Link to="/edit-profile">
							<button>Изменить аккаунт</button>
						</Link>
				<button onClick={handleClick}>Удалить аккаунт</button>
			</div>

			{showModal && (
				<ConfirmModal
					isOpen={showModal}
					message="Вы уверены, что хотите удалить свой аккаунт?"
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
}
