import { cities } from "../utils/consts.jsx";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader.jsx";

const Cities = () => {
	return (
		<div className="wrapper">
			<h2 className="wrapper-text">Выберите город, чтобы узнать погоду</h2>
			<ul>
				{cities.map((city, index) => (
					<li key={index}>
						<Link to={`/weather/${city}`} className="wrapper-link">
							{city}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const CityPage = () => {
	const { city } = useParams();
	const [temp, setTemp] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		fetchWeather(city);
	}, [city]);
	async function fetchWeather(cityName) {
		setTemp(null);
		setError("");
		setLoading(true);

		if (!cityName.trim()) {
			setError("Введите название города!");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`http://localhost:4040/weather/${cityName}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Ошибка при получении данных");
			}

			setTemp(data.temp);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="wrapper">
			<h2 className="wrapper-text">
				Погода в {city}
				{isLoading ? (
					<Loader />
				) : (
					temp !== null && (
						<span>
							: Температура: <b>{temp}°C</b>
						</span>
					)
				)}
			</h2>
		</div>
	);
};

export { Cities, CityPage };
