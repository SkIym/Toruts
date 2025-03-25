import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { useField } from "../../hooks"
import { signAsStudent, updateStudent } from "../../reducers/userReducer"
import { StudentInfo, UserData } from "../../types"
import { UserType } from "../../types"
import { useNavigate } from "react-router-dom"
import { TEST } from "@/constants"
import { z } from "zod"
import { useForm } from "react-hook-form"

const StudentSchema = z.object({
    areasImp: z
        .coerce.string(),
    degree: z
        .string()
        .optional(),
})

type StudentSchemaType = z.infer<typeof StudentSchema>

type Props = {
    info?: StudentInfo
}

const StudentForm = ({ info }: Props) => {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const StudentForm = useForm<StudentSchemaType>({
        defaultValues: info ? {
            areasImp:
        }
    })

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

    return <div data-testid={TEST.form('student')}>
        <h3>Signing up as a student</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <span>Areas of Improvement [optional]:</span>
                <input {...areas} data-testid={TEST.input('areas')} />
            </div>
            <div>
                <span>Degree Program [optional]:</span>
                <input {...degree} data-testid={TEST.input('degrees')}  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
            </div>
            {user?.userType === UserType.STUDENT
                        ? <button data-testid={TEST.button('update')} type="button" onClick={handleUpdate}>Update student information</button>
                        : <button data-testid={TEST.button('create')} type="submit">Create student account</button>}
            {/* <button type="submit">Create student account</button> */}
        </form>
    </div>
}

export default StudentForm
