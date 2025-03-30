import classNames from "classnames";
import Header from "../components/Headers.jsx";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
	const isLightTheme = useSelector((state) => state.theme.isLightTheme);

	return (
		<div className={classNames("app", { light: isLightTheme })}>
			<div className="container">
				<Header />
				{children}
			</div>
		</div>
	);
}
