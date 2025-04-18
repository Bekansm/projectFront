import {
	Home,
	Login,
	Register,
	Profile,
	NotFound,
	Time,
	Cities,
	CityPage,
	EditProfile,
	FavoriteLocations,
} from "../pages/pages.jsx";

const privateRoutes = [
	{ path: "/weather", element: <Cities /> },
	{ path: "/weather/:city", element: <CityPage /> },
	{ path: "/time", element: <Time /> },
	{ path: "/profile", element: <Profile /> },
	{ path: "/edit-profile", element: <EditProfile /> },
	{ path: "/favorite-locations", element: <FavoriteLocations />}
];

const publicRoutes = [
	{ path: "/home", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/not-found", element: <NotFound /> },
];

export { privateRoutes, publicRoutes };
