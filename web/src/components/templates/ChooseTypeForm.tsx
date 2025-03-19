import { useState } from "react";
import TutorForm from "./TutorForm";
import StudentForm from "./StudentForm";

const ChooseTypeForm = () => {
    const [type, setType] = useState(true);
    
        const toggleForm = () => {
            setType(!type)
    }
    
    return (
        <div>
            <h2 data-testid="heading" >Who are you?</h2>
            <div>
                {type
                    ?
                    <div>
                        <button data-testid="student-button" type="button" onClick={toggleForm}>I'm a student</button>
                        <TutorForm info={null}></TutorForm>
                    </div>

                    :
                    <div>
                        <button data-testid="tutor-button" type="button" onClick={toggleForm}>I'm a tutor</button>
                        <StudentForm info={null}></StudentForm>
                    </div>
                }
            </div>
        </div>
    )
}

export default ChooseTypeForm
