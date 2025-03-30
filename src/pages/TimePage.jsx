import { useState } from "react";
import Loader from "../components/Loader.jsx";

export default function Time() {
	const [city, setCity] = useState(""); // Заполняем из URL или оставляем пустым
	const [time, setTime] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	async function fetchWeather(cityName) {
		setTime(null);
		setError("");
		setLoading(true);

		if (!cityName.trim()) {
			setError("Введите название города!");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`http://localhost:4040/time/${cityName}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Ошибка при получении данных");
			}

			setTime(data.time);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="wrapper">
			<h1 className="wrapper-text">Время в городе</h1>
			<input
				type="text"
				placeholder="Введите город..."
				value={city}
				onChange={(e) => setCity(e.target.value)}
			/>
			<button onClick={() => fetchWeather(city)}>Получить время</button>

			<div style={{ textAlign: "center", marginTop: "50px" }}>
				{error && <p className="wrapper-text">{error}</p>}
				{isLoading ? (
					<Loader />
				) : (
					time !== null && (
						<p className="wrapper-text">
							Время в {city}: <b>{time}</b>
						</p>
					)
				)}
			</div>
		</div>
	);
}
