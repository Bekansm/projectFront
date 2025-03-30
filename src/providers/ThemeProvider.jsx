import { Provider } from "react-redux";
import { store } from "../redux/store.jsx";

export default function ThemeProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}
