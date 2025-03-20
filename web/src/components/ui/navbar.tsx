import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { useField } from "../../hooks";

const Navbar = (props) => {
	const { ...search } = useField("text");
	return (
		<div className="bg-gray-500 flex p-2 text-gray-50 mb-10 gap-5">
			<Link to={"/?"}>Toruts</Link>
			<Link to={"/profile?"}>
				<h3>Profile</h3>
			</Link>
			<Input className="w-1/5 h-4/5" {...search} />
		</div>
	);
};

export default Navbar;
