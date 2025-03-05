import { useDispatch, useSelector } from "react-redux"
import { useField } from "../../hooks"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../../store"
import { addUserInfo } from "../../reducers/userReducer"
import React, { useState } from "react"
import TutorForm from "./TutorForm"
import StudentForm from "./StudentForm"
import { StudentInfo, UserInfo, UserType, TutorInfo } from "../../types"

export const InfoForm = ()  => {
    const user = useSelector((state: RootState) => state.user);
    
    const primaryInfo = user?.primaryInfo
    const roleInfo = user?.roleInfo

    const { reset: fnameReset, ...firstName } = useField("text", primaryInfo?.firstName)
    const { reset: lnameReset, ...lastName } = useField("text", primaryInfo?.lastName)
    const { reset: phoneReset, ...phoneNumber } = useField("text", primaryInfo?.phoneNumber)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

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
        <h2>Update your primary information: </h2>

        { user?.userType !== null
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
                <input {...firstName} data-testid="first-name"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            <div>
                <span>Last Name</span>
                <input {...lastName} data-testid="last-name"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            <div>
                <span>Phone Number</span>
                <input {...phoneNumber} data-testid="phone-number" pattern="[0-9]+" title="Please enter only numeric characters."/>
            </div>
            
            <button type="submit">Update primary information</button>

        </form>
        <div>
            <h2>Updating your role information:</h2>
            {user?.userType === UserType.TUTOR 
            ? <TutorForm info={user.roleInfo as TutorInfo}></TutorForm>
            : <StudentForm info={user?.roleInfo as StudentInfo}></StudentForm>}
        </div>
    </div>

}
