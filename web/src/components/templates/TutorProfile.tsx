import { TutorInfo } from "../../types"

const TutorProfile = ({info}: {info: TutorInfo}) => {
    return (
        <div>
            <p>Education: {info.educAttainment}</p>
            <p>Venue: {info.venue}</p>
            <p>Learning Mode: {info.learningMode}</p>
            <p>Price: {info.price}</p>
            <p>Areas of Expertise: {info.areasOfExpertise}</p>
            <p>Tutoring experience:{info.tutoringExperiences}</p>
            <p>Availability: {info.availability}</p>
        </div>
    )
}

export default TutorProfile
