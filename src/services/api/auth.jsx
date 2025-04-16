const API_BASE_URL = import.meta.env.VITE_API_URL;
export async function loginUser({ email, password }) {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Ошибка при авторизации");
		}

		return result;
	} catch (error) {
		throw error;
	}
}

export async function registerUser({ name, email, password }) {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: name, email, password }),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Ошибка при регистрации");
		}

		return result;
	} catch (error) {
		throw error;
	}
}
