import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="wrapper">
			<h1 className="wrapper-text">Добро пожаловать на WeatherTime!</h1>
			<p
				className="wrapper-text"
				style={{ maxWidth: "600px", marginTop: "20px" }}
			>
				На этом сайте вы можете:
			</p>
			<ul
				className="wrapper-text"
				style={{ lineHeight: "1.8", marginTop: "10px" }}
			>
				<li>
					🌍 Узнать текущее <b>время</b> в любом городе мира
				</li>
				<li>
					🌦 Посмотреть <b>погоду</b> в популярных городах
				</li>
				<li>
					🔐 Зарегистрироваться и получить доступ к дополнительным функциям
				</li>
			</ul>

			<div style={{ marginTop: "40px" }}>
				<Link to="/time" className="wrapper-link">
					Узнать время
				</Link>
				<Link to="/weather" className="wrapper-link">
					Посмотреть погоду
				</Link>
			</div>
		</div>
	);
}
