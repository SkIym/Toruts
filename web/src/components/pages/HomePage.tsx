import { Link } from "react-router-dom";
import SearchForm from "../templates/SearchForm";
import { PATH, TEST } from "@/constants";
import Navbar from "../ui/navbar";
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/components/ui/dialog";

const HomePage = () => {
	return (
		<div data-testid={TEST.page("home")}>
			<Navbar />
			<div className="pl-50 pr-50">
				<SearchForm />
			</div>
		</div>
	);
};

export default HomePage;
