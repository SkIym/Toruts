import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { AppDispatch } from "../../store"
import { useNavigate } from "react-router-dom"
import { addUserInfo } from "../reducers/userReducer"

export const InformationComponent = () => {
    const { reset: fnameReset, ...firstName } = useField("text")
    const { reset: lnameReset, ...lastName } = useField("text")

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

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
                token: JSON.parse(loggedInUserJSON)
            }))

            fnameReset()
            lnameReset()
            navigate('/')
        } catch (e) {
            console.error(e)
            return;
        }
    }
    return <div id="information">
        <h2>Update your profile</h2>
        <form onSubmit={handleInformation} id="user-information-form">
            <div>
                <span>First Name</span>
                <input {...firstName} />
            </div>
            <div>
                <span>Last Name</span>
                <input {...lastName} />
            </div>
            <button type="submit" > Upload</button>
        </form>
    </div>

}
