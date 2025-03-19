import { TutorResult } from "../../types";

type TutorSearchResult = {
	id: number;
	educAttainment: string;
	learningMode: number;
	venue: string;
	price: number;
	areasOfExpertise: string[];
	tutoringExperiences: string;
	availability: string;
	portraitUrl: string;
	status: number;
	firstName: string;
	lastName: string;
	phoneNumber: string;
};

const TutorSearchResult = (props: TutorResult) => {
	return (
		<div className="border-2 p-5 rounded-md">
			<span>
				{props.user.firstName} {props.user.lastName}
			</span>
			<br />
			<span>{props.price} PHP</span>
			<br />
			<span>{props.availability}</span>
		</div>
	);
};

export default TutorSearchResult;
