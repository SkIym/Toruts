import { useState } from "react";
import TutorForm from "./TutorForm";
import StudentForm from "./StudentForm";
import { Button } from "../ui/button";
import { TEST } from "@/constants";

const SelectTypeForm = () => {
    const [type, setType] = useState(true);
    
        const toggleForm = () => {
            setType(!type)
    }
    
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                {type
                    ?
                    <div>
                      <h1 className="page-title font-bold text-gray-900">Who are you?</h1>
                      <Button type="button" onClick={toggleForm} data-testid={TEST.button('switch')}>I'm a student</Button>
                        <TutorForm></TutorForm>
                    </div>

                    :
                    <div>
                      <h1 className="page-title font-bold text-gray-900">Who are you?</h1>
                      <Button type="button" onClick={toggleForm} data-testid={TEST.button('switch')}>I'm a tutor</Button>
                        <StudentForm></StudentForm>
                    </div>
                }
        </div>
    )
}

export default SelectTypeForm
