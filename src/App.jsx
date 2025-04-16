import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";

import Layout from "./core/Layouts.jsx";
import PrivateRoute from "./services/privateRoutes.jsx";
import { privateRoutes, publicRoutes } from "./services/routes.jsx";

function App() {
	return (
		<Layout>
			<Routes>
				{publicRoutes.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
				{privateRoutes.map(({ path, element }) => (
					<Route
						key={path}
						path={path}
						element={<PrivateRoute>{element}</PrivateRoute>}
					/>
				))}
				<Route path="/" element={<Navigate to="/home" replace />} />
				<Route path="*" element={<Navigate to="/not-found" replace />} />
			</Routes>
		</Layout>
	);
}

export default App;
