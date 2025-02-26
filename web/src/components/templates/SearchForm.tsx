import { useDispatch } from "react-redux"
import { useField } from "../../hooks"
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
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const getTutors = async () => {
            console.log('Getting tutors')
            const result = await tutorService.search({ query: "", minPrice: null, maxPrice: null })
            setTutors(result)
            setIsReady(true)
        }
        
        getTutors();
    }, [])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsReady(false)
        try {
            const minPriceInt = parseInt(minPrice.value)
            const maxPriceInt = parseInt(maxPrice.value)
            dispatch(getTutors({
                query: search.value,
                minPrice: isNaN(minPriceInt) ? null : minPriceInt,
                maxPrice: isNaN(maxPriceInt) ? null : maxPriceInt,

            }, (a: TutorResult[]) => {
                setTutors(a)
                setIsReady(true)
            }))

        } catch (e) {
            console.log(e)
            return
        }
    }

    return (
        <div>
            <span>Search Tutors</span>
            
            {isReady
            ?   
                <div>
                     <form onSubmit={handleSearch}>
                        <span>Search</span>
                        <input {...search} data-testid="search" /> <br />
                        <span>Filter</span><br />
                        <span>Price: </span> <input {...minPrice} data-testid="minPrice" /> - <input {...maxPrice} data-testid="maxPrice" />
                        <button data-testid="search-button"> Search </button>
                    </form>
                    <div>
                        {tutors.length === 0 
                        ?   "No tutors found :( "
                        :   tutors.map((tutor) => {
                                return <TutorSearchResult {...tutor} />
                            })
                        }
                    </div>
                </div>  
            :   <div>Loading</div>
            }
        </div>
    )
}

export default SearchForm
