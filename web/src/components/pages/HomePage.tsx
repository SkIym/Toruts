import { Link } from "react-router-dom"
import SearchForm from "../templates/SearchForm"
import { PATH, TEST } from "@/constants"

const HomePage = () => {
    return (
        <div data-testid={TEST.page('home')}>
            <h1>Toruts</h1>
            <Link to={`${PATH.PROFILE.default}?`}>
                <h3>Profile</h3>
            </Link>
            <SearchForm />
        </div>

export default HomePage;
