import { Hero, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export default function Error404 () {
	const navigate = useNavigate();
	return (
		<Hero>
			<Hero.Overlay className="bg-base-300 p-6 h-screen" />
			<Hero.Content className="p-3 flex flex-col justify-center items-center">
				<h1 className="text-8xl font-bold">
					404 - Not Found
				</h1>
				<p className="text-2xl">
					Sorry, the page you're looking for doesn't exist
				</p>
				<Button color="accent" onClick={() => navigate("/")} fullWidth>
					Go to Home
				</Button>
			</Hero.Content>
		</Hero>
	)
}