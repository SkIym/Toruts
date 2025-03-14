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

    const handleSignup = async () => {
        if (user) {
            console.log(user)
            if (user.userType == UserType.TUTOR) {
                navigate("/signup-student")
            } else {
                navigate("/signup-tutor")
            }
        }
    }

    // console.log(user?.primaryInfo, user?.roleInfo, user?.type)
    console.log(user)
    const primaryInfo = user?.primaryInfo;
    const roleInfo = user?.roleInfo

    return (
        <div data-testid="page" id="profile">
            <h1 data-testid="heading">OMG HELLO {user?.primaryInfo?.firstName}</h1>
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

            <button data-testid="edit-button" onClick={() => navigate('/info')}>Edit Profile</button>
            <button data-testid="delete-button" onClick={handleDelete}>Delete Profile</button>
            <button data-testid="logout-button" onClick={handleLogout}>Logout</button>

            {
                user?.dual 
                ? 
                (
                    <button data-testid="switch-button" onClick={handleSwitch}>
                        {user?.userType === UserType.TUTOR
                        ? "Switch to Student Mode"
                        : "Switch to Tutor Mode"}
                    </button>
                )
                :
                (
                    <button data-testid="signup-button" onClick={handleSignup}>
                        {user?.userType === UserType.TUTOR
                        ? "Sign up as a student"
                        : "Sign up as a tutor"}
                    </button>
                )

            }
            
        </div>

    )

}

export default ProfilePage
