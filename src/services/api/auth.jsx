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

export async function getUserProfile(token) {
	const response = await fetch(`${API_BASE_URL}/user/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Ошибка загрузки профиля");
	}

	return data;
}

export async function updateUsername(token, username) {
	try {
		const response = await fetch(`${API_BASE_URL}/user/me/name`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ username }),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Ошибка при обновлении имени");
		}

		return result;
	} catch (error) {
		throw error;
	}
}

export async function updateEmail(token, email) {
	try {
		const response = await fetch(`${API_BASE_URL}/user/me/email`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ email }),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Ошибка при обновлении email");
		}

		return result;
	} catch (error) {
		throw error;
	}
}
export async function deleteUserAccount(token) {
	const response = await fetch(`${API_BASE_URL}/user/me/delete`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const result = await response.json();
		throw new Error(result.message || "Ошибка при удалении аккаунта");
	}
}
