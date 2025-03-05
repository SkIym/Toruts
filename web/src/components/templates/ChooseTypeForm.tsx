import { useNavigate } from "react-router-dom";
import { UserType } from "../../types";

const ChooseTypeForm = () => {
    const navigate = useNavigate();
    const handleClick = (userType: UserType) => {
        // will update this
        if (userType == UserType.STUDENT) {
            navigate('/');
        } else {
            navigate('/');
        }
        return
    }
    return (
        <div>
            <h3>Who are you?</h3>
            <button type='button' onClick={() => handleClick(UserType.STUDENT)}>I'm a student</button>
            <button type="button" onClick={() => handleClick(UserType.TUTOR)}>I'm a tutor</button>
        </div>
    )
}

export default ChooseTypeForm
