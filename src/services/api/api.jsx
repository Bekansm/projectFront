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



//Методы для избранных городов

export async function getFavoriteLocations() {
	const response = await fetch(`${API_BASE_URL}/favoriteLocation`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);
	return data;
}

export async function addFavoriteLocation(city) {
	const response = await fetch(`${API_BASE_URL}/favoriteLocation/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ city }),
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);
	return data;
}

export async function updateFavoriteLocation(city) {
	const response = await fetch(`${API_BASE_URL}/favoriteLocation`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ city }),
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);
	return data;
}

export async function deleteFavoriteLocation(city) {
	const response = await fetch(`${API_BASE_URL}/favoriteLocation`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ city }),
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);
	return data;
}