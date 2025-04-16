const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchWeather(cityName) {
	if (!cityName.trim()) {
		throw new Error("Введите название города!");
	}
	console.log(API_BASE_URL);
	console.log(cityName);
	const response = await fetch(`${API_BASE_URL}/weather/${cityName}`);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || "Ошибка при получении данных");
	}

	return data.temp;
}

export async function fetchTime(cityName) {
	if (!cityName.trim()) {
		throw new Error("Введите название города!");
	}

	const response = await fetch(`${API_BASE_URL}/time/${cityName}`);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || "Ошибка при получении времени");
	}

	return data.time;
}
