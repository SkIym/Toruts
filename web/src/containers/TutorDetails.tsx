import {
	TutorComment,
	LearningMode,
	StudentMatchInfo,
	TutorResult,
	UserType,
} from "@/types/types";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import TutorConfirmationForm from "./TutorConfirmationForm";
import { Badge } from "../components/ui/badge";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import commentService from "@/services/comments";
import Comment from "./Comment";
import { TEST } from "@/constants/constants";

const defaultPicture =
  "https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg";

const TutorDetails = ({ selectedTutor }: { selectedTutor: TutorResult }) => {
	const getLearningMode = (learningMode: LearningMode) => {
		if (learningMode === 0) {
			return <div>Online</div>;
		}
		if (learningMode === 1) {
			return <div>F2F</div>;
		}
		return <div>Hybrid</div>;
	};

	const getComments = async () => {
		console.log("getting tutor comments");
		const tutorComments = await commentService.get(selectedTutor.id);
		setComments(tutorComments);
	};

	const [comments, setComments] = useState<TutorComment[]>([]);

	useEffect(() => {
		getComments();
	}, [selectedTutor]);
	console.log(comments);

	const user = useSelector((state: RootState) => state.user);
	console.log(selectedTutor);
	return (
		<>
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
					<div
						className="flex flex-col"
						data-testid={TEST.card("selected-tutor")}
					>
						<b>
							{selectedTutor.firstName} {selectedTutor.lastName}
						</b>
						<span>{selectedTutor.educAttainment}</span>
					</div>

					<div className="flex flex-col">
						<span>{selectedTutor.price} PHP</span>
						<span>{getLearningMode(selectedTutor.learningMode)}</span>
					</div>
				</div>
				{user?.userType === UserType.STUDENT ? (
					<TutorConfirmationForm tutor={selectedTutor} />
				) : null}
			</div>

			<div className="bg-gray-100 w-full p-4 flex flex-col border-b-2">
				<b>Areas of Expertise</b>
				<div className="flex flex-col gap-2">
					{selectedTutor.areasOfExpertise.map((exp: string) => (
						// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
						<Badge>{exp}</Badge>
					))}
				</div>
			</div>
			<div className="w-full p-4 flex flex-col">
				<b>Tutor Availability</b>
				<span>{selectedTutor.availability}</span>
			</div>
			<div className="w-full p-4 flex flex-col border-t-2">
				<b>Prior Experience</b>
				<p>{selectedTutor.tutoringExperiences}</p>
			</div>
			<div className="w-full p-4 flex flex-col border-t-2">
				<b>Current Tutees</b>
				{selectedTutor.matchedStudents?.map((s: StudentMatchInfo) => {
					return (
						<p>
							{s.firstName} {s.lastName}
						</p>
					);
				})}
			</div>
			<div className="border-t-2 p-4 flex flex-col">
				<b>Contacts</b>
				<span>{selectedTutor.phoneNumber}</span>
			</div>

			<div className="w-full p-4 flex flex-col border-t-2">
				<b>Comments</b>

				{user?.userType === UserType.STUDENT &&
        selectedTutor.matchedStudents?.find(
        	(m) => m.id === user.roleInfo?.id
        ) ? (
						<CommentForm tutorId={selectedTutor.id} onCommentPost={getComments} />
					) : null}

				{/* view here */}
				<div className="flex flex-col gap-5">
					{comments.map((d: TutorComment, i: number) => {
						return (
							<Comment
								commentData={d}
								onCommentDelete={() =>
									setComments(comments.filter((c) => c.id === i))
								}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default TutorDetails;
