import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { logoutUser, deleteUser, switchMode } from "../../reducers/userReducer";
import { useNavigate, Link } from "react-router-dom";
import { StudentInfo, TutorInfo, UserType } from "../../types";
import TutorProfile from "../templates/TutorProfile";

import StudentProfile from "../templates/StudentProfile";

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

    const handleSwitch = async () => {
        console.log(user)
        if (user){
            const userType = user.userType
            if (userType !== null) {
                try {
                    console.log("Handling switching modes")
                    const toUserType = userType === UserType.STUDENT ? UserType.TUTOR : UserType.STUDENT
                    await dispatch(switchMode(toUserType, user?.userName))
                } catch {
                    return
                }
            }
        }
    }

    // console.log(user?.primaryInfo, user?.roleInfo, user?.type)

    const primaryInfo = user?.primaryInfo;
    const roleInfo = user?.roleInfo

    return (
        <div>
            <h1>OMG HELLO {user?.userName}</h1>
            <Link to={"/"}>
                <h3>Home</h3>
            </Link>
            <div>
                <span>First Name: {primaryInfo?.firstName}</span>
            </div>
            <div>
                <span>Last Name: {primaryInfo?.lastName}</span>
            </div>
            <div>
                <span>Phone Number: {primaryInfo?.phoneNumber}</span>
            </div>
            {user?.userType == UserType.TUTOR
                ? <TutorProfile info={roleInfo as TutorInfo}></TutorProfile>
                : (user?.userType == UserType.STUDENT
                    ? <StudentProfile info={roleInfo as StudentInfo}></StudentProfile>
                    : null)}

            <button onClick={() => navigate('/info')}>Edit Profile</button>
            <button onClick={handleDelete}>Delete Profile</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleSwitch}>
                {user?.userType === UserType.TUTOR
                ? "Switch to Student Mode"
                : "Switch to Tutor Mode"}
            </button>
        </div>

    )

}

export default ProfilePage
