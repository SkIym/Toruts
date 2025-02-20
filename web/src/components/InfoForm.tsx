import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { AppDispatch } from "../../store"
import { useNavigate } from "react-router-dom"
import { addUserInfo } from "../reducers/userReducer"
import React, { useState } from "react"
import TutorForm from "./TutorForm"
import StudentForm from "./StudentForm"

export const InfoForm = () => {
    const { reset: fnameReset, ...firstName } = useField("text")
    const { reset: lnameReset, ...lastName } = useField("text")
    const { reset: phoneReset, ...phoneNumber } = useField("text")


    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const [type, setType] = useState(true);

    const toggleForm = () => {
        setType(!type)
    }

    const handleInformation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
            if (loggedInUserJSON == null) {
                throw "not logged in";
            }

            await dispatch(addUserInfo({
                firstName: firstName.value,
                lastName: lastName.value,
                phoneNumber: phoneNumber.value,
                token: JSON.parse(loggedInUserJSON)
            }))

            // another dispatch here for creation of the tutor or student

            navigate("/")
            fnameReset()
            lnameReset()
        } catch {
            return;
        }
    }
    return <div id="information">
        <h2>Update your information</h2>
        <form onSubmit={handleInformation} id="user-information-form">
            <div>
                <span>First Name</span>
                <input {...firstName} data-testid="first-name"/>
            </div>
            <div>
                <span>Last Name</span>
                <input {...lastName} data-testid="last-name"/>
            </div>
            <div>
                <span>Phone Number</span>
                <input {...phoneNumber} data-testid="phone-number"/>
            </div>
            <div>
                {type
                ? 
                    <div>
                        <h2>Updating profile as a tutor...</h2>
                        <button type="button" onClick={toggleForm}>I'm a student</button>
                        <TutorForm></TutorForm>
                    </div>
                     
                : 
                    <div>
                        <h2>Updating profile as a student</h2>
                        <button type="button" onClick={toggleForm}>I'm a tutor</button>
                        <StudentForm></StudentForm>
                    </div>
                }                        
            </div>
        </form>
    </div>

}
