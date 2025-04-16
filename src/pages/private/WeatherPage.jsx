import { cities } from "../../utils/consts.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader.jsx";
import { fetchWeather } from "../../services/api/api.jsx";
import ConfirmModal from "../../components/ConfirmationModal.jsx";

const Cities = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedCity, setSelectedCity] = useState(null);
	const navigate = useNavigate();

	const handleCityClick = (cityName, e) => {
		e.preventDefault(); // Предотвращаем переход по ссылке
		setSelectedCity(cityName);
		setShowModal(true);
	};

	const handleConfirm = () => {
		setShowModal(false);
		navigate(`/weather/${selectedCity}`);
	};

	const handleCancel = () => {
		setShowModal(false);
		setSelectedCity(null);
	};

	return (
		<div className="wrapper">
			<h2 className="wrapper-text">Выберите город, чтобы узнать погоду</h2>
			<ul>
				{cities.map((city, index) => (
					<li key={index} style={{ fontWeight: "bold" }}>
						<Link
							to={`/weather/${city}`}
							className="wrapper-link"
							onClick={(e) => handleCityClick(city, e)}
						>
							{city}
						</Link>
					</li>
				))}
			</ul>

			<ConfirmModal
				isOpen={showModal}
				message={`Вы уверены, что хотите узнать погоду в городе ${selectedCity}?`}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</div>
	);
};

const CityPage = () => {
	const { city } = useParams();
	const [temp, setTemp] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate(); // импорт навигации

	useEffect(() => {
		const getWeather = async () => {
			setTemp(null);
			setError("");
			setLoading(true);
			try {
				const temperature = await fetchWeather(city);
				setTemp(temperature);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		getWeather();
	}, [city]);

	return (
		<div className="wrapper">
			<h2 className="wrapper-text">
				Погода в {city}
				{isLoading ? (
					<Loader />
				) : (
					temp !== null && (
						<>
							<span>
								: Температура: <b>{temp}°C</b>
							</span>
						</>
					)
				)}
			</h2>
			{!isLoading && <button onClick={() => navigate(-1)}>Назад</button>}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
};

export { Cities, CityPage };
