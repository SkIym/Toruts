import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { useField } from "../../hooks"
import { signAsStudent, updateStudent } from "../../reducers/userReducer"
import { StudentInfo, UserData } from "../../types"
import { UserType } from "../../types"
import { useNavigate } from "react-router-dom"

const StudentForm = () => {

    const { reset: areasReset, ...areas } = useField("text")
    const { reset: degreeReset, ...degree } = useField("text")
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            navigate('/profile')
        } catch (e) {
            console.log(e)
            return
        }
    }

    const handleUpdate = async () => {
        const info = user?.roleInfo as StudentInfo
            try {
                if (user)
                    await dispatch(updateStudent(
                        user.userName,
                        {
                            areasOfImprovement: areas.value ? [areas.value] : info.areasOfImprovement,
                            degreeProgram: degree.value || info.degreeProgram
                        }))
                navigate("/profile");
            } catch {
                return;
            }
    }

    return <div>
        <span>Student Info Form</span>
        <form onSubmit={handleSubmit} id="student-info">
            <div>
                <span>Areas of Improvement [optional]:</span>
                <input {...areas} data-testid="areas" />
            </div>
            <div>
                <span>Degree Program [optional]:</span>
                <input {...degree} data-testid="degree"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            {user?.userType === UserType.STUDENT
                        ? <button type="button" onClick={handleUpdate}>Update student information</button>
                        : <button type="submit">Create student account</button>}
        </form>
    </div>
}

export default StudentForm
