import { Link } from "react-router-dom";

const Navbar = (props) => {
	return (
		<div className="bg-gray-500 flex p-2 text-gray-50 mb-10 gap-5">
			<Link to={"/?"}>Toruts</Link>
			<Link to={"/profile?"}>
				<h3>Profile</h3>
			</Link>
		</div>
	);
};

export default Navbar;
