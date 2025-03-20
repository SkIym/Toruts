import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { logoutUser } from "@/reducers/userReducer";
import { Input } from "../ui/input";
import { useField } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

const Navbar = (props) => {
	const user = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const handleLogout = async () => {
		console.log("logging out from navbar");

		try {
			await dispatch(logoutUser());
			navigate("/login");
		} catch {}
	};

	const { ...search } = useField("text");

	return (
		<div className="bg-gray-500 flex p-2 pl-6 pr-6 text-gray-50 mb-10 w-full">
			<div className="flex w-2/3 gap-5 justify-start items-end">
				<Link to={"/?"}>Toruts</Link>
				<Link to={"/profile?"}>
					<h3>Profile</h3>
				</Link>
				<Input className="w-1/5 h-4/5 bg-gray-200 text-black" {...search} />
			</div>
			<div className="flex justify-end w-1/3">
				<button onClick={handleLogout}>Logout</button>
			</div>
		</div>
	);
};

export default Navbar;
