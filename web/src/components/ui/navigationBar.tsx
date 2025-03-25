import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/reducers/userReducer";
import { useState } from "react";
import { Input } from "./input";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = useState("");
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/?query=${searchQuery}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e as unknown as React.FormEvent);
        }
    };

    const handleLogout = async () => {
		console.log("logging out from navbar");

		try {
			await dispatch(logoutUser());
			navigate("/login");
		} catch {}
	};

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const hideRoutes = ["/login", "/signup"];
    const shouldHide = hideRoutes.indexOf(location.pathname);

    return (
        <nav className="max-w-full bg-gray-800 p-5 max-h-1/11">
            <div className="flex flex-row justify-between items-center mr-10 ml-10">
                <div className="flex items-center">
                    <Link to="/" className="font-pacifico text-white text-3xl m-2">Toruts</Link>
                </div>
                {shouldHide !== -1 && (
                    <form className="flex flex-row basis-1/3 space-x-10 h-4/5 text-black" onSubmit={handleSearchSubmit}>
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="text-black bg-white w-full"
                            onKeyDown={handleKeyDown}
                        />
                        <button type="submit" className="text-white">Search</button>
                    </form>
                )}
                {shouldHide !== 0 && shouldHide !== 1 && (
                    <div className="flex flex-row space-x-25 items-center">
                        <div className="relative flex flex-column">
                            <Link to="/" className="pt-2 pb-2 text-white items-center">Home</Link>
                        </div>
                        <div className="relative flex" onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown}>
                            <Link to="/profile" className="text-white cursor-pointer pt-2 pb-2">Profile</Link>
                            {isProfileDropdownOpen && (
                                <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg w-41 transition-all duration-300 ease-in-out">
                                    <li className="block px-4 py-4 text-black hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                        <Link to="/profile">View Profile</Link>
                                    </li>
                                    <li className="block px-4 py-4 text-black hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                        <Link to="/profile/edit">Edit Profile</Link>
                                    </li>
                                    <li className="block px-4 py-4 text-black hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                        <Link to="/login" onClick={handleLogout}>Logout</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;