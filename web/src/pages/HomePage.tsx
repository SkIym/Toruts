import { useLocation } from "react-router-dom";
import SearchForm from "../containers/SearchForm";
import { TEST } from "@/constants/constants";

const HomePage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchQuery = queryParams.get("query") || "";

	return (
		<div data-testid={TEST.page("home")}>
			<div className="pl-50 pr-50 pt-10">
				<SearchForm initialQuery={searchQuery} />
			</div>
		</div>
	);
};

export default HomePage;
