import { TEST } from "@/constants"
import { Status, TutorInfo } from "../../types"
import { useRandomString } from "@/hooks"

const TutorProfile = ({ info }: { info: TutorInfo }) => {
    return (
        <div data-testid={TEST.profile('tutor')}>
            <img src={`${info.portraitUrl}?random=${useRandomString()}`} alt="" className="size-16"/>
            <h3>Status: {info.status === Status.Active ? 'ACTIVE' : 'INACTIVE'}</h3>
            <p>Education: {info.educAttainment}</p>
            <p>Venue: {info.venue}</p>
            <p>Learning Mode: {info.learningMode}</p>
            <p>Price: {info.price}</p>
            <p>Areas of Expertise: {info.areasOfExpertise.join(" ")}</p>
            <p>Tutoring experience:{info.tutoringExperiences}</p>
            <p>Availability: {info.availability}</p>
        </div>
    )
}

export default TutorProfile
