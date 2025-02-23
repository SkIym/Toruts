import { useDispatch } from "react-redux"
import { useField } from "../../hooks"
import { AppDispatch } from "../../../store"
import { getTutors } from "../../reducers/userReducer"
import { TutorInfo } from "../../types"
import { useState } from "react"

const SearchForm = () => {
    const { ...search } = useField("text")
    const dispatch = useDispatch<AppDispatch>()

    const [tutors, setTutors] = useState<TutorInfo[]>([])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            dispatch(getTutors(search.value, (a: TutorInfo[]) => {
                setTutors(a)
            }))

        } catch (e) {
            console.log(e)
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input{...search} />
                <button> search</button>
            </form>

            <div>
                {
                    tutors.map((tutor) => {
                        return (<span>{tutor.id}</span>)
                    })
                }
            </div>
        </div>
    )
}

export default SearchForm
