import { Link } from "react-router-dom";
import SearchForm from "../templates/SearchForm";
import { PATH, TEST } from "@/constants";
import Navbar from "../ui/navbar";

const HomePage = () => {
	return (
		<div data-testid={TEST.page("home")}>
			<Navbar />
			<div className="pl-50">
				<SearchForm />
			</div>
		</div>
	);
};

export default HomePage;
