import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

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


    console.log("(app) hello", user)
    return (
        <div>
            <h1>OMG HELLO</h1>
            <button onClick={() => navigate('/profile')}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
        
}

export default ProfilePage