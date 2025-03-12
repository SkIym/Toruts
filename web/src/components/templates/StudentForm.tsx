import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { useField } from "../../hooks"
import { signAsStudent, updateStudent } from "../../reducers/userReducer"
import { StudentInfo, UserData } from "../../types"
import { UserType } from "../../types"
import { useNavigate } from "react-router-dom"

const StudentForm = ({info}: {info: StudentInfo | null }) => {

    const { reset: areasReset, ...areas } = useField("text", info?.areasOfImprovement[0])
    const { reset: degreeReset, ...degree } = useField("text", info?.degreeProgram)
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
                            degreeProgram: degree.value
                        }))
                navigate("/profile");
            } catch {
                return;
            }
    }

    return <div>
        <h3 data-testid="heading-student">Signing up as a student</h3>
        <form onSubmit={handleSubmit} data-testid="form" id="student-form">
            <div>
                <span>Areas of Improvement [optional]:</span>
                <input {...areas} data-testid="areas" />
            </div>
            <div>
                <span>Degree Program [optional]:</span>
                <input {...degree} data-testid="degree"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            {user?.userType === UserType.STUDENT
                        ? <button data-testid="update" type="button" onClick={handleUpdate}>Update student information</button>
                        : <button data-testid="create" type="submit">Create student account</button>}
            {/* <button type="submit">Create student account</button> */}
        </form>
    </div>
}

export default StudentForm
