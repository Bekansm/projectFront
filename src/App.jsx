import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Cities, CityPage } from "./pages/WeatherPage.jsx";
import Time from "./pages/TimePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./core/Layouts.jsx";
function App() {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/weather" element={<Cities />} />
					<Route path="/weather/:city" element={<CityPage />} />
					<Route path="/time" element={<Time />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route path="/" element={<Navigate to="/time" replace />} />
					<Route path="*" element={<Navigate to="/not-found" replace />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
