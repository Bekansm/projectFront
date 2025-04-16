import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";
import {
	Home,
	Login,
	Register,
	Profile,
	NotFound,
	Time,
	Cities,
	CityPage,
} from "./pages/pages.jsx";

import Layout from "./core/Layouts.jsx";

import PrivateRoute from "./services/privateRoutes.jsx";

function App() {
	const privateRoutes = [
		{ path: "/weather", element: <Cities /> },
		{ path: "/weather/:city", element: <CityPage /> },
		{ path: "/time", element: <Time /> },
		{ path: "/profile", element: <Profile /> },
	];

	const publicRoutes = [
		{ path: "/home", element: <Home /> },
		{ path: "/login", element: <Login /> },
		{ path: "/register", element: <Register /> },
		{ path: "/not-found", element: <NotFound /> },
	];

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
