import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-5">
            <div className="container mx-auto flex flex-row items-center justify-between">
                <h1 className="text-white text-xl basis-1/4">Toruts</h1>
                <div className="flex space-x-4 basis-3/4">
                    <Link to="/" className="text-white basis-1/3">Home</Link>
                    <Link to="/profile" className="text-white basis-1/3">Profile</Link>
                    <Link to="/login" className="text-white basis-1/3">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;