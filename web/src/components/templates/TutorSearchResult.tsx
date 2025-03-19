import { TutorResult } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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

const TutorSearchResult = ({ user, price, availability, ...props }) => {
	return (
		<div>
			<Card>
				<CardHeader>
					{user.firstName} {user.lastName}
				</CardHeader>
				<CardContent className="flex-col flex">
					<span>{price} PHP</span>
					<span>{availability}</span>
				</CardContent>
			</Card>
		</div>
	);
};

export default TutorSearchResult;
