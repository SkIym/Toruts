import { Link } from "react-router-dom";
import SearchForm from "../templates/SearchForm";
import Navbar from "../ui/navbar";

const HomePage = () => {
	return (
		<div data-testid="page" id="home">
			<Navbar />
			<div className="pl-50 pr-50 size-full">
				<SearchForm />
			</div>
		</div>
	);
};

export default HomePage;
