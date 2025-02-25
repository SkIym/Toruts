import { useDispatch } from "react-redux"
import { useErrorNotification, useField } from "../../hooks"
import { AppDispatch } from "../../../store"
import { getTutors } from "../../reducers/userReducer"
import { TutorResult } from "../../types"
import { useEffect, useState } from "react"
import TutorSearchResult from "./TutorSearchResult"

import tutorService from "../../services/tutor"

const SearchForm = () => {
    const { ...search } = useField("text")
    const { ...minPrice } = useField("number")
    const { ...maxPrice } = useField("number")

    const dispatch = useDispatch<AppDispatch>()

    const [tutors, setTutors] = useState<TutorResult[]>([])

    useEffect(() => {
        tutorService.search({ query: null, minPrice: null, maxPrice: null })
            .then(data => setTutors(data))
    }, [])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const minPriceInt = parseInt(minPrice.value)
            const maxPriceInt = parseInt(maxPrice.value)
            dispatch(getTutors({
                query: search.value,
                minPrice: isNaN(minPriceInt) ? null : minPriceInt,
                maxPrice: isNaN(maxPriceInt) ? null : maxPriceInt,

            }, (a: TutorResult[]) => {
                setTutors(a)
            }))

        } catch (e) {
            console.log(e)
            return
        }
    }

    return (
        <div>
            <span>Search Tutors</span>
            <form onSubmit={handleSearch}>
                <span>Search</span>
                <input{...search} /> <br />
                <span>Filter</span><br />
                <span>Price: </span> <input {...minPrice} /> - <input {...maxPrice} />
                <button> search</button>
            </form>

            <div>
                {
                    tutors.map((tutor) => {
                        return <TutorSearchResult {...tutor} />
                    })
                }
            </div>
        </div>
    )
}

export default SearchForm
