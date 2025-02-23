import { useDispatch } from "react-redux"
import { useField } from "../../hooks"
import { AppDispatch } from "../../../store"
import { getTutors } from "../../reducers/userReducer"

const SearchForm = () => {
    const { reset: searchReset, ...search } = useField("text")
    const dispatch = useDispatch<AppDispatch>()

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            dispatch(getTutors(search.value))

        } catch (e) {
            console.log(e)
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch} >
                <input{...search} />
                <button> search</button>
            </form>

            <div>
                Tutor 1
                Tutor 2
            </div>
        </div>
    )
}

export default SearchForm
