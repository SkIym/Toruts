import { Link, useLocation } from "react-router-dom";
import SearchForm from "../templates/SearchForm";
import { PATH, TEST } from "@/constants";
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/components/ui/dialog";

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
