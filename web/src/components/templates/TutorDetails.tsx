import { LearningMode, TutorResult } from "@/types";

const defaultPicture =
	"https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg";

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
	console.log(selectedTutor);
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
					<button
						className="bg-green-200 rounded-2xl p-5 drop-shadow-xs hover:bg-green-300"
						onClick={callback}
					>
						Apply
					</button>
				</div>
			</div>

			<div className="bg-gray-100 w-full p-4 flex flex-col border-b-2">
				<b>Areas of Expertise</b>
				{selectedTutor.areasOfExpertise.map((exp) => (
					<div>{exp}</div>
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
