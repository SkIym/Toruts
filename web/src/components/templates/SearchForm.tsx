import { useField } from "../../hooks"

const SearchForm = () => {
    const { reset: searchReset, ...search } = useField("text")

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div>
            <form >
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
