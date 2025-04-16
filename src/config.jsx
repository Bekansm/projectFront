const isLocalhost = window.location.hostname === "localhost";

export const API_BASE_URL = isLocalhost
	? "http://localhost:8000"
	: "https://your-production-api.com";
