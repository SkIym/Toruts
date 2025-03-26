import { TEST } from "@/constants";
import { Status, TutorInfo } from "../../types";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const TutorProfile = ({ info }: { info: TutorInfo }) => {
	return (
		<div
			data-testid={TEST.profile("tutor")}
			className="flex flex-col gap-5 mt-5 pb-5"
		>
			{/*<img src={`${info.portraitUrl}?random=${useRandomString()}`} alt="" className="size-16"/>*/}
			<b>Tutor Profile</b>
			<div className="flex gap-5">
				<Label>Active</Label>
				<Checkbox checked={info.status === Status.Active} />
			</div>
			<div className="flex gap-10">
				<div className="w-1/3">
					<Label>Education</Label>
					<Input value={info.educAttainment} disabled />
				</div>
				<div>
					<Label>Venue</Label>
					<Input value={info.venue} disabled />
				</div>
				<div>
					<Label>Learning Mode</Label>
					<Input
						value={
							info.learningMode == 0
								? "Online"
								: info.learningMode == 1
									? "F2F"
									: "Hybrid"
						}
						disabled
					/>
				</div>
				<div>
					<Label>Price</Label>
					<Input value={info.price + " PHP"} disabled />
				</div>
			</div>
			<div className="flex flex-col">
				<b>Areas of Expertise</b>
				<div className="flex gap-2 mt-2">
					{info.areasOfExpertise.map((area) => {
						return (
							<>
								<Badge>{area}</Badge>
							</>
						);
					})}
				</div>
			</div>
			<div className="mt-5">
				<b>Tutoring Experience</b>
				<p>{info.tutoringExperiences}</p>
			</div>
			<div className="mt-5">
				<b>Availability</b>
				<div>{info.availability}</div>
			</div>
			<div>
				<b>Contacts</b>
				<p>Facebook</p>
				<p>Twitter</p>
			</div>
		</div>
	);
};

export default TutorProfile;
