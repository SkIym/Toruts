import { useField } from "../hooks"

const StudentInfoForm = () => {

    const { reset: areasReset, ...areas } = useField("text")
    const { reset: degreeReset, ...degree } = useField("text")

    const handleInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return <div>
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
