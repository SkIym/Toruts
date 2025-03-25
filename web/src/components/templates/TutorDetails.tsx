import { LearningMode, TutorResult, UserType, StudentInfo } from "@/types";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Children } from "react";
import { useSelector } from "react-redux";
import { userInfo } from "os";
import { Badge } from "../ui/badge";

const defaultPicture =
	"https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg";

const Emph = ({ children }) => {
	return <span className="text-orange-500">{children}</span>;
};

const TutorDetails = ({ selectedTutor, callback, ...props }) => {
	const getLearningMode = (learningMode: LearningMode) => {
		if (learningMode === 0) {
			return <div>Online</div>;
		}
		if (learningMode === 1) {
			return <div>F2F</div>;
		}
		return <div>Hybrid</div>;
	};

	const user = useSelector((state: RootState) => state.user);
	let data = null;
	// console.log(user.userT, UserType.STUDENT);
	if (user.userType == UserType.STUDENT) {
		// console.log("I AM A STUDENT");
		const roleInfo: StudentInfo = user.roleInfo;
		data = roleInfo.areasOfImprovement;
		// console.log(roleInfo);
	}

	return (
		<div className="h-full overflow-y-auto">
			<div className="flex border-b-2 w-full">
				<div className="p-6 flex gap-5 w-2/3">
					<img
						src={
							selectedTutor.portraitUrl !== "None"
								? selectedTutor.portraitUrl
								: defaultPicture
						}
						alt=""
						className="h-20 w-20 rounded-full object-cover"
					/>
					<div className="flex flex-col">
						<b>
							{selectedTutor.user.firstName} {selectedTutor.user.lastName}
						</b>
						<span>{selectedTutor.educAttainment}</span>
					</div>

					<div className="flex flex-col">
						<span>{selectedTutor.price} PHP</span>
						<span>{getLearningMode(selectedTutor.learningMode)}</span>
					</div>
				</div>

				<div className="flex w-1/3 items-center justify-end mr-20">
					<Dialog className="relative z-10">
						<DialogTrigger className="bg-green-100 p-2 w-40 rounded-lg hover:bg-green-200">
							Apply
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-center">
									{selectedTutor.user.firstName} {selectedTutor.user.lastName}'s
									Tutoring Service
								</DialogTitle>
							</DialogHeader>
							<DialogDescription className="flex flex-col">
								<p className="mb-2 text-center w-full mb-4 border-t-2 pt-2">
									Select which one do you need
								</p>
								<div className="flex gap-4 justify-center mb-4">
									{data ? (
										<>
											{data.map((area) => {
												return (
													// biome-ignore lint/correctness/useJsxKeyInIterable: i just want a cleaner classname for this div :(
													<div
														className="border-2 border-orange-400 pl-2 pr-2 pt-1 pb-1 
													text-orange-400 rounded-full hover:bg-orange-400 hover:text-white"
													>
														{area}
													</div>
												);
											})}
										</>
									) : (
										<div>No areas to improve upon</div>
									)}
								</div>
								<div className="border-2 p-4 rounded-lg">
									<p>
										Before confirming the service, make sure that you have
										talked to Mr. {selectedTutor.user.lastName} using the
										contact details displayed and have agreed on the following:
									</p>
									<ul className="list-disc list-inside">
										<li>
											<Emph>Advertised</Emph> or <Emph>bargained</Emph> price
										</li>
										<li>
											<Emph>Frequency</Emph>, and <Emph>Venue</Emph> of the
											tutoring session
										</li>
									</ul>
								</div>
							</DialogDescription>
							<DialogClose asChild>
								<div className="flex w-full gap-3 justify-center">
									<Button className="bg-orange-400 hover:bg-orange-500 w-1/2">
										Confirm
									</Button>
									<Button className="w-1/2 bg-gray-200 text-black hover:bg-gray-300">
										Cancel
									</Button>
								</div>
							</DialogClose>
						</DialogContent>
						<DialogFooter></DialogFooter>
					</Dialog>
				</div>
			</div>

			<div className="bg-gray-100 w-full p-4 flex flex-col border-b-2">
				<b>Areas of Expertise</b>
				{selectedTutor.areasOfExpertise.map((exp: string) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>

					<div>
						<Badge>He</Badge>
					</div>
				))}
			</div>
			<div className="w-full p-4 flex flex-col">
				<b>Tutor Availability</b>
				<span>{selectedTutor.availability}</span>
			</div>
			<div className="w-full p-4 flex flex-col border-t-2">
				<b>Prior Experience</b>
				<p>{selectedTutor.tutoringExperiences}</p>
			</div>
			<p className="w-full p-4 border-t-2">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet
				fringilla rhoncus. Aliquam lacinia ullamcorper eros interdum dictum. Nam
				porta quis dolor sodales sodales. Ut sodales placerat mi a interdum.
				Aliquam rhoncus dolor sed ligula luctus sagittis. Nullam id urna quis
				orci lobortis tincidunt id nec massa. Quisque feugiat elementum
				hendrerit. Fusce vel nisi felis. Donec quis mauris ut ipsum interdum
				rutrum. Curabitur sit amet ultricies augue, vitae dignissim elit. Sed
				pellentesque gravida odio, fermentum fringilla massa malesuada ut.
				Aliquam non pulvinar lectus, a semper velit. Pellentesque eget nulla nec
				libero tempus feugiat. Aenean nec gravida neque. Maecenas accumsan
				pretium urna, eu varius nulla sagittis vitae. Morbi finibus diam vitae
				mi suscipit placerat. Quisque et leo ac lectus fringilla blandit.
				Pellentesque habitant morbi tristique senectus et netus et malesuada
				fames ac turpis egestas. Nunc eu congue nulla. Sed et congue arcu, vitae
				imperdiet ex. Phasellus auctor, tortor vel venenatis lacinia, metus
				purus lacinia est, a bibendum turpis neque a libero. Pellentesque
				tincidunt vulputate malesuada. Proin at consequat nulla, id mattis
				turpis. Nullam consectetur eget arcu ut laoreet. Phasellus vestibulum
				turpis eget turpis tempor egestas. Fusce tempus odio erat, et egestas
				nunc imperdiet tristique. Aliquam sed sem et neque feugiat tempus.
				Phasellus sed bibendum nulla. Mauris dignissim leo enim, sit amet
				faucibus nulla hendrerit dapibus. Aenean nunc risus, feugiat in interdum
				id, tincidunt at tellus. Vivamus eu urna et risus faucibus vehicula.
				Donec eget nunc libero. Ut et pulvinar neque. Suspendisse potenti. Sed
				venenatis semper ante, at placerat risus cursus eu. Nunc cursus arcu non
				diam hendrerit, eu elementum urna accumsan. In molestie libero mi, quis
				lacinia nulla porta ut. Vestibulum cursus porta quam, eget dictum justo
				placerat vitae. Etiam vitae pretium arcu, eu auctor velit. Nam felis
				lorem, imperdiet id risus ut, tincidunt semper nisi. Mauris at odio at
				nisl imperdiet tincidunt. Cras urna lacus, pellentesque id leo at,
				ornare dignissim metus. Duis ac elementum velit. Donec ac ligula nulla.
				Pellentesque ex mi, pulvinar vel metus non, pulvinar venenatis dui. Nam
				efficitur felis velit, et imperdiet justo sodales quis. Vestibulum
				convallis elit a neque tincidunt ornare. Ut viverra nisl vel commodo
				ultrices. In at ullamcorper ex, volutpat dapibus erat. Aliquam commodo
				neque vitae scelerisque blandit. In arcu dolor, consequat vitae leo ut,
				pretium imperdiet nulla. Integer sit amet ipsum quis dolor pharetra
				mattis sit amet vel augue. Suspendisse potenti. Cras id dictum libero.
				Cras vel orci odio. Praesent non blandit leo. Sed est urna, gravida id
				egestas quis, mattis non massa. Vestibulum vel lorem arcu. Aenean
				consectetur quam sit amet ex dignissim tempus.
			</p>
			<div className="border-t-2 p-4 flex flex-col">
				<b>Contacts</b>
				<span>123456789</span>
			</div>
		</div>
	);
};

export default TutorDetails;
