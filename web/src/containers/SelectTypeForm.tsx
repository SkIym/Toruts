import { useState } from "react";
import TutorForm from "./TutorForm";
import StudentForm from "./StudentForm";
import { Button } from "../components/ui/button";
import { TEST } from "@/constants/constants";

const SelectTypeForm = () => {
	const [type, setType] = useState(true);

	const toggleForm = () => {
		setType(!type);
	};

	return (
		<div className="flex flex-col min-h-svh items-center p-6 md:p-10 gap-5">
			<div className="flex flex-row justify-center w-full">
				<Button
					type="button"
					onClick={toggleForm}
					data-testid={TEST.button("switch")}
				>
					{type ? "I'm a student" : "I'm a tutor"}
				</Button>
			</div>
			<div className="w-2/3">
				{type ? <TutorForm></TutorForm> : <StudentForm></StudentForm>}
			</div>
		</div>
	);
};

export default SelectTypeForm;
