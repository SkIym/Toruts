import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { AppDispatch } from "../../store"
import { useNavigate } from "react-router-dom"

const export informationComponent = () => {
    const { reset: fnameReset, ...firstName } = useField("text")
    const { reset: lnameReset, ...lastName } = useField("text")

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const handleInformation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
        } catch (err) {
            return
        }

        return (
            <div id="information">
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
        )
    }

}
