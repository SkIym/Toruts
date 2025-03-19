import { TEST } from "@/constants"
import { StudentInfo } from "../../types"

const StudentProfile = ({ info }: { info: StudentInfo}) => {
    return (
        <div data-testid={TEST.profile('student')}>
            <p>Program: {info.degreeProgram}</p>
            <p>Areas of Improvement: {info.areasOfImprovement}</p>
        </div>
    )
}

export default StudentProfile
