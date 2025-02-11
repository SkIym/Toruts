import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.user);
    console.log("(app) hello", user)
    return (
        <div>
            <h1>OMG HELLO</h1>
        </div>
       
    )
        
}

export default ProfilePage