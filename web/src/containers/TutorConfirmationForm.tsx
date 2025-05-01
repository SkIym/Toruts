import { TutorResult } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "../components/ui/dialog";
import { StudentInfo } from "@/types/types";
import { Button } from "../components/ui/button";
import { matchWithTutor } from "@/app/redux/userReducer";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TEST } from "@/constants/constants";

interface Props {
  tutor: TutorResult;
}
const Emph = ({ children }) => {
	return <span className="text-orange-500">{children}</span>;
};

const TutorConfirmationForm = ({ tutor }: Props) => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	const studentData = user?.roleInfo as StudentInfo;
	const data = studentData.areasOfImprovement;

	const [subject, setSubject] = useState<string>(
		studentData.areasOfImprovement[0]
	);

	const handleApply = async () => {
		if (user)
			try {
				console.log(tutor.id, subject, tutor.price);
				await dispatch(
					matchWithTutor(user?.userName, {
						tutorId: tutor.id,
						subject,
						price: tutor.price,
					})
				);
			} catch (e) {
				console.log(e);
				return;
			}
	};

	const currentTutorIds = studentData.matchedTutors?.map((m) => m.id);

	return (
		<div className="flex w-1/3 items-center justify-end mr-20">
			<Dialog className="relative z-10">
				<DialogTrigger
					className="bg-green-100 p-2 w-40 rounded-lg hover:bg-green-200"
					data-testid={TEST.button("apply")}
				>
					{currentTutorIds?.includes(tutor.id) ? "End" : "Apply"}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-center">
							{tutor.firstName} {tutor.lastName}'s Tutoring Service
						</DialogTitle>
					</DialogHeader>
					<DialogDescription className="flex flex-col">
						<p className="mb-2 text-center w-full border-t-2 pt-2">
              Select which one do you need
						</p>
						<div className="flex gap-4 justify-center mb-4">
							{data ? (
								<RadioGroup
									defaultValue={data[0]}
									className="flex flex-wrap gap-2 justify-center"
									onValueChange={(value) => setSubject(value)}
								>
									{data.map((area) => {
										return (
											<div key={area} className="flex items-center space-x-2">
												<RadioGroupItem
													value={area}
													id={area}
													data-testid={TEST.radio("area")}
												/>
												<Label
													htmlFor={area}
													className="border-2 border-orange-400 px-3 py-1 
                                                text-orange-400 rounded-full hover:bg-orange-400 hover:text-white
                                                cursor-pointer"
												>
													{area}
												</Label>
											</div>
										);
									})}
								</RadioGroup>
							) : (
								<div>No areas to improve upon</div>
							)}
						</div>
						<div className="border-2 p-4 rounded-lg">
							<p>
                Before confirming the service, make sure that you have talked to
                Mr. {tutor.lastName} using the contact details displayed and
                have agreed on the following:
							</p>
							<ul className="list-disc list-inside">
								<li>
									<Emph>Advertised</Emph> or <Emph>bargained</Emph> price
								</li>
								<li>
									<Emph>Frequency</Emph>, and <Emph>Venue</Emph> of the tutoring
                  session
								</li>
							</ul>
						</div>
					</DialogDescription>
					<DialogClose asChild>
						<div className="flex w-full gap-3 justify-center">
							<Button
								className="bg-orange-400 hover:bg-orange-500 w-1/2"
								onClick={handleApply}
								data-testid={TEST.button("confirm")}
							>
                Confirm
							</Button>
							<Button
								className="w-1/2 bg-gray-200 text-black hover:bg-gray-300"
								data-testid={TEST.button("cancel")}
							>
                Cancel
							</Button>
						</div>
					</DialogClose>
				</DialogContent>
				<DialogFooter></DialogFooter>
			</Dialog>
		</div>
	);
};

export default TutorConfirmationForm;
