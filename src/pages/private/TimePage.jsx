import { useState } from "react";
import Loader from "../../components/Loader.jsx";
import { fetchTime } from "../../services/api/api.jsx";

export default function Time() {
	const [city, setCity] = useState("");
	const [time, setTime] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	const handleFetchTime = async () => {
		setTime(null);
		setError("");
		setLoading(true);

		try {
			const result = await fetchTime(city);
			setTime(result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="wrapper">
			<h1 className="wrapper-text">Время в городе</h1>
			<input
				type="text"
				placeholder="Введите город..."
				value={city}
				onChange={(e) => setCity(e.target.value)}
			/>
			<button onClick={handleFetchTime}>Получить время</button>

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
