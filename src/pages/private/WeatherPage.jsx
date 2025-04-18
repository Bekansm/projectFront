
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader.jsx";
import { fetchWeather, getFavoriteLocations} from "../../services/api/api.jsx";
import ConfirmModal from "../../components/ConfirmationModal.jsx";

const Cities = () => {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
	const [showModal, setShowModal] = useState(false);
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
		setShowModal(true);
	};

	const handleConfirm = () => {
		setShowModal(false);
		navigate(`/weather/${selectedCity}`);
	};

	const handleCancel = () => {
		setSelectedCity(null);
		setShowModal(false);
	};


	return (
		<div className="wrapper">
			<h2 className="wrapper-text">Просмотр Погоды</h2>

		

			<ul>
				{cities.map((loc, index) => (
					<li key={index} style={{ fontWeight: "bold" }}>
						<Link
							to={`/weather/${loc.city}`}
							className="wrapper-link"
							onClick={(e) => handleCityClick(loc.city, e)}
						>
							{loc.city}
						</Link>
					</li>
				))}
			</ul>

			<ConfirmModal
				isOpen={showModal}
				message={`Показать погоду в городе ${selectedCity}?`}
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
