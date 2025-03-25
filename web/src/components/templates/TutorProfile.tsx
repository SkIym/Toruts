import { TEST } from "@/constants";
import { Status, TutorInfo } from "../../types";
import { useRandomString } from "@/hooks";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const TutorProfile = ({ info }: { info: TutorInfo }) => {
	return (
		<div data-testid={TEST.profile("tutor")} className="flex flex-col gap-2">
			{/*<img src={`${info.portraitUrl}?random=${useRandomString()}`} alt="" className="size-16"/>*/}
			<div className="flex gap-5">
				<Label>Active</Label>
				<Checkbox checked={info.status === Status.Active} />
			</div>
			<div className="flex gap-10">
				<div>
					<b>Education</b>
					<Input value={info.educAttainment} disabled />
				</div>
				<div>
					<b>Venue</b>
					<Input value={info.venue} disabled />
				</div>
				<div>
					<b>Learning Mode</b>
					<p>{info.learningMode}</p>
				</div>
				<div>
					<p>Price: {info.price} PHP</p>
				</div>
			</div>
			<div className="flex flex-col">
				<b>Areas of Expertise</b>
				{info.areasOfExpertise.map((area) => {
					return <span>- {area}</span>;
				})}
			</div>
			<div>
				<b>Tutoring experience:</b>
				<p>{info.tutoringExperiences}</p>
			</div>
			<div>
				<p>Availability: {info.availability}</p>
			</div>
		</div>
	);
};

export default TutorProfile;
