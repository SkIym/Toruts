import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../ui/input";

const NavBar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/?query=${searchQuery}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e as unknown as React.FormEvent);
        }
    };

    const hideNavBarRoutes = ["/login", "/signup"];
    const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

    return (
        <nav className="w-full bg-gray-800 p-5 h-1/11.5">
            <div className="flex flex-row justify-between items-center mr-10 ml-10">
                <div className="flex items-center">
                    <h1 className="font-pacifico text-white text-3xl m-2">Toruts</h1>
                </div>
                {!shouldHideNavBar && (
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
                {!shouldHideNavBar && (
                    <div className="flex flex-row space-x-25 items-center">
                        <Link to="/" className="text-white">Home</Link>
                        <Link to="/profile" className="text-white">Profile</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;