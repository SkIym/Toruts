import { Link } from "react-router-dom";
import SearchForm from "../templates/SearchForm";

const HomePage = () => {
	return (
		<div data-testid="page" id="home">
			<h1>Toruts</h1>
			<Link to={"/profile?"}>
				<h3>Profile</h3>
			</Link>
			<div className="pl-50 pr-50">
				<SearchForm />
			</div>
		</div>
	);
};

export default HomePage;
