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

const TutorSearchResult = ({
	user,
	price,
	availability,
	callback,
	...props
}) => {
	return (
		<div>
			<Card onClick={callback}>
				<CardHeader>
					<b>
		¡				{user.firstName} {user.lastName}
					</b>
				</CardHeader>
				<CardContent className="flex gap-10">
					<img
						src="https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg"
						alt=""
						className="h-20 w-20 rounded-full object-cover"
					/>
					<div className="flex flex-col">
						<span>{price} PHP</span>
						<span>{availability}</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default TutorSearchResult;
