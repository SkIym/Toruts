import { useDispatch, useSelector } from "react-redux"
import { useField } from "../../hooks"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../../store"
import { addUserInfo } from "../../reducers/userReducer"
import React, { useState } from "react"
import TutorForm from "./TutorForm"
import StudentForm from "./StudentForm"

export const InfoForm = () => {
    const { reset: fnameReset, ...firstName } = useField("text")
    const { reset: lnameReset, ...lastName } = useField("text")
    const { reset: phoneReset, ...phoneNumber } = useField("text")


    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate();
    const [type, setType] = useState(true);

    const toggleForm = () => {
        setType(!type)
    }

    const handleInformation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
            if (user == null || loggedInUserJSON == null) {
                throw "not logged in";
            }

            await dispatch(addUserInfo(
                user.userName,
                {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    phoneNumber: phoneNumber.value,
                    // token: JSON.parse(loggedInUserJSON)
                }))
            fnameReset()
            lnameReset()
            phoneReset()
            navigate('/profile')
        } catch {
            return;
        }
    }
    return <div id="information">
        <h2>Update your information</h2>

        { user?.userType 
        ? <div>
            <Link to="/profile">
            Back to Profile
            </Link>
            <Link to="/">
                Home
            </Link>
        </div>
        : null
        }
        <form onSubmit={handleInformation} id="user-information-form">
            <div>
                <span>First Name</span>
                <input {...firstName} data-testid="first-name"  pattern="[A-Za-z]+" title="Please enter only alphabetical characters."/>
            </div>
            <div>
                <span>Last Name</span>
                <input {...lastName} data-testid="last-name"  pattern="[A-Za-z]+" title="Please enter only alphabetical characters."/>
            </div>
            <div>
                <span>Phone Number</span>
                <input {...phoneNumber} data-testid="phone-number" pattern="[0-9]+" title="Please enter only numeric characters."/>
            </div>
            <button type="submit">Update</button>
        </form>
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
    </div>

}
