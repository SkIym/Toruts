import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logoutUser, deleteUser } from "../reducers/userReducer";
import { useNavigate, Link } from "react-router-dom";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        console.log("Handling logout..")
        try {
            await dispatch(logoutUser())
            navigate("/login")
        } catch {
            //
        }
    }

    const handleDelete = async () => {
        console.log("Handling deletion...")
        try {
            const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
            if (loggedInUserJSON == null) {
                throw "not logged in";
            }

            await dispatch(deleteUser(JSON.parse(loggedInUserJSON)))
        } catch {
            //
        }
    }


    return (
        <div>
            <h1>OMG HELLO</h1>
            <Link to={"/"}>
                <h3>Home</h3>
            </Link>
            <button onClick={() => navigate('/info')}>Edit Profile</button>
            <button onClick={handleDelete}>Delete Profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
        
}

export default ProfilePage