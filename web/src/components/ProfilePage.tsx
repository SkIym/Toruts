import { useSelector } from "react-redux"
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.user);
    console.log("hello", user)
    return (
        <div>
            { user ? <h1>OMG HELLO</h1>
                : <Navigate replace to={"/login"}/>
            }
        </div>
       
    )
        
}

export default ProfilePage