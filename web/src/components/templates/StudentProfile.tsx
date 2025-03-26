import { TEST } from "@/constants";
import { StudentInfo } from "../../types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const StudentProfile = ({ info }: { info: StudentInfo }) => {
	return (
		<div
			data-testid={TEST.profile("student")}
			className="flex flex-col gap-5 mt-5 mb-5"
		>
			<div>
				<Label>Degree Program</Label>
				<Input disabled value={info.degreeProgram} />
			</div>
			<div>
				<Label>Areas of Improvement</Label>
				<div className="flex gap-2 p-3">
					{info.areasOfImprovement.map((area) => (
						<Badge>{area}</Badge>
					))}
				</div>
			</div>
		</div>
	);
};

export default StudentProfile;
