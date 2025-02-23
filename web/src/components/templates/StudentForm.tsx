import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../store"
import { useField } from "../../hooks"
import { signAsStudent } from "../../reducers/userReducer"
import { UserData } from "../../types"

const StudentForm = () => {

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

            const user: UserData = JSON.parse(loggedInUserJson)

            await dispatch(signAsStudent(user.userName, {
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

export default StudentForm
