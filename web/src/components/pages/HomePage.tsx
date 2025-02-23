import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <h1>OMG HELLO</h1>
            <h2>There will be a list of tutors here and a search bar...</h2>
            <Link to={"/profile?"}>
                <p>Profile</p>
            </Link>
        </div>

    )
}

export default HomePage
