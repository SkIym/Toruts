import { Link } from "react-router-dom"
import SearchForm from "../templates/SearchForm"

const HomePage = () => {
    return (
        <div data-testid="page" id="home">
            <h1>Toruts</h1>
            <Link to={"/profile?"}>
                <h3>Profile</h3>
            </Link>
            <SearchForm />
        </div>

    )
}

export default HomePage
