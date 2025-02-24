import { useDispatch } from "react-redux"
import { useField } from "../../hooks"
import { AppDispatch } from "../../../store"
import { getTutors } from "../../reducers/userReducer"
import { TutorResult } from "../../types"
import { useState } from "react"
import TutorSearchResult from "./TutorSearchResult"

const SearchForm = () => {
    const { ...search } = useField("text")
    const dispatch = useDispatch<AppDispatch>()

    const [tutors, setTutors] = useState<TutorResult[]>([])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            dispatch(getTutors(search.value, (a: TutorResult[]) => {
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
                    // tutors.map((tutor) => {
                    //     return (<span>{tutor.user.firstName} {tutor.user.lastName}</span>)
                    // })
                    tutors.map((tutor) => {
                        return <TutorSearchResult {...tutor}/>
                    })
                }
            </div>
        </div>
    )
}

export default SearchForm
