import { useDispatch } from "react-redux"
import { useErrorNotification, useField } from "../hooks"
import { AppDispatch } from "../../store"
import { useNavigate } from "react-router-dom"
import { signAsStudent } from "../reducers/userReducer"

const StudentInfoForm = () => {

    const { reset: areasReset, ...areas } = useField("text")
    const { reset: degreeReset, ...degree } = useField("text")

    const dispatch = useDispatch<AppDispatch>()

    const handleInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const loggedInUserJson = window.localStorage.getItem("loggedInUser")
            if (loggedInUserJson == null) {
                throw "not logged in"
            }
            await dispatch(signAsStudent("", {
                areasOfImprovement: areas.value.split(","),
                degreeProgram: degree.value
            }))
            areasReset()
            degreeReset()
        } catch (e) {
            console.log(e)
            return
        }
    }

    return <div>
        <span>Student Info Form</span>
        <form onSubmit={handleInfo} id="student-info">
            <div>
                <span>Areas of Improvement:</span>
                <input {...areas} data-testid="areas" />
            </div>
            <div>
                <span>Degree Program</span>
                <input {...degree} data-testid="areas" />
            </div>
            <button type="submit"> Upload</button>
        </form>
    </div>

}

export default StudentInfoForm
