import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="w-full bg-gray-800 p-5">
            <div className="flex flex-row justify-between items-center mr-5 ml-5">
                <h1 className="pacifico-regular text-white text-xl m-2">Toruts</h1>
                <div className="flex flex-row justify-between space-x-4 mr-7 w-40">
                    <Link to="/" className="text-white">Home</Link>
                    <Link to="/profile" className="text-white">Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;