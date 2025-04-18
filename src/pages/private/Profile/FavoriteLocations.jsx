// pages/Cities.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	getFavoriteLocations,
	addFavoriteLocation,
	deleteFavoriteLocation,
} from "../../../services/api/api.jsx";
import ConfirmModal from "../../../components/ConfirmationModal.jsx";

export default function FavoriteLocations() {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [isDelete, setDelete] = useState(false);
	const [modalType, setModalType] = useState("confirm");
	const [modalMessage, setModalMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const locations = await getFavoriteLocations();
				setCities(locations);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchCities();
	}, []);

	const handleCityClick = (city, e) => {
		e.preventDefault();
		setSelectedCity(city);
		setModalType("confirm");
		setModalMessage(`Показать погоду в городе ${city}?`);
		setShowModal(true);
	};

	const handleAddCity = () => {
		setModalType("input");
		setModalMessage("Введите название нового города:");
		setShowModal(true);
	};

	const handleConfirm = async (inputValue) => {
		setShowModal(false);
		if (isDelete) {
			console.log(selectedCity);
			try {
				await deleteFavoriteLocation(selectedCity);
				setCities(cities.filter((loc) => loc.city !== selectedCity));
			} catch (err) {
				alert(err.message);
			}
		} else {
			if (modalType === "confirm") {
				navigate(`/weather/${selectedCity}`);
			} else if (modalType === "input") {
				if (!inputValue) return;
				try {
					const created = await addFavoriteLocation(inputValue);
					setCities([...cities, created]);
				} catch (err) {
					alert(err.message);
				}
			}
		}
	};

	const handleCancel = () => {
		setSelectedCity(null);
		setDelete(false);

		setShowModal(false);
	};

	const handleDeleteCity = (city) => {
		setSelectedCity(city);
		setModalType(null);
		setModalMessage(`Удалить город ${city} из избранного?`);
		setDelete(true);
		setShowModal(true);
	};

	return (
		<div className="profile wrapper">
			<h2 className="wrapper-text">Избранные города</h2>

			<button onClick={handleAddCity} style={{ marginBottom: "1rem" }}>
				Добавить город
			</button>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<ul>
				{cities.map((loc, index) => (
					<li key={index} className="city-item">
						<Link
							className="wrapper-link"
							onClick={(e) => handleCityClick(loc.city, e)}
						>
							{loc.city}
						</Link>
						<button
							id="delete-button"
							onClick={() => handleDeleteCity(loc.city)}
						>
							x
						</button>
					</li>
				))}
			</ul>

			<ConfirmModal
				isOpen={showModal}
				message={modalMessage}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				withInput={modalType === "input"}
			/>
		</div>
	);
}
