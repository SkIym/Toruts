import { useNavigate } from "react-router-dom";
import { UserType } from "../../types";
import { useState } from "react";
import TutorForm from "./TutorForm";
import StudentForm from "./StudentForm";

const ChooseTypeForm = () => {
    const navigate = useNavigate();
    const [type, setType] = useState(true);
    
        const toggleForm = () => {
            setType(!type)
    }
    
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
            <h2>Who are you?</h2>
            <div>
                {type
                    ?
                    <div>
                        <h3>Signing up as a tutor...</h3>
                        <button type="button" onClick={toggleForm}>I'm a student</button>
                        <TutorForm></TutorForm>
                    </div>

                    :
                    <div>
                        <h3>Signing up as a student</h3>
                        <button type="button" onClick={toggleForm}>I'm a tutor</button>
                        <StudentForm></StudentForm>
                    </div>
                }
            </div>
        </div>
    )
}

export default ChooseTypeForm
