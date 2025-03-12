import { SignUpForm } from "../templates/SignupForm"
import { UserType } from "../../types"
import TutorForm from "../templates/TutorForm"
import StudentForm from "../templates/StudentForm"

const SignupPage = ({type}: {type: UserType | null}) => {
    switch (type) {
        case UserType.TUTOR:
            return (
                <div>
                    <TutorForm info={null}/>
                </div>
            )
        case UserType.STUDENT:
            return (
                <div>
                    <StudentForm info={null}/>
                </div>
            )
        default:
            return (
                <div data-testid="page" id="signup">
                    <SignUpForm />
                </div>
            )
    }
}

export default SignupPage
