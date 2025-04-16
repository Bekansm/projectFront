import {
	Home,
	Login,
	Register,
	Profile,
	NotFound,
	Time,
	Cities,
	CityPage,
} from "../pages/pages.jsx";

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

export { privateRoutes, publicRoutes };
