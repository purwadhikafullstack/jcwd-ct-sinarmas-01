import { Button } from "react-daisyui";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function DarkButton () {
	const [isDark, setIsDark] = useState(false);
	const toggleTheme = () => setIsDark(dark => !dark);
	useEffect(() => {
		if (localStorage.darkMode) {
			setIsDark(true);
		}
	}, []);
	useEffect(() => {
		const root = document.querySelector("html");
		isDark ? root.classList.add("dark") : root.classList.remove("dark");
		root.dataset.theme = isDark ? "dark" : "light";
		localStorage.darkMode = isDark ? "true" : "";
	}, [isDark]);

	return (
		<Button color="ghost" className="rounded-full" onClick={toggleTheme}>
			{isDark ? <FaSun /> : <FaMoon />}
		</Button>
	)
}