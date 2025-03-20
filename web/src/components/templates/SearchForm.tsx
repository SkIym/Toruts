import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { AppDispatch } from "../../../store";
import { getTutors } from "../../reducers/userReducer";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

import TutorSearchResult from "./TutorSearchResult";
import { TutorDetails } from "./TutorDetails";

import tutorService from "../../services/tutor";
import { LearningMode, TutorResult } from "@/types";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const SearchForm = () => {
	const { ...search } = useField("text");
	const { ...minPrice } = useField("number");
	const { ...maxPrice } = useField("number");

	const dispatch = useDispatch<AppDispatch>();

	const [tutors, setTutors] = useState<TutorResult[]>([]);
	const [isReady, setIsReady] = useState(false);

	const [selectedTutor, setSelectedTutor] = useState<TutorResult | null>(null);

	useEffect(() => {
		const getTutors = async () => {
			console.log("Getting tutors");
			const result = await tutorService.search({
				query: "",
				minPrice: null,
				maxPrice: null,
			});
			setTutors(result);
			setIsReady(true);
		};

		getTutors();
	}, []);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsReady(false);
		try {
			const minPriceInt = parseInt(minPrice.value);
			const maxPriceInt = parseInt(maxPrice.value);
			dispatch(
				getTutors(
					{
						query: search.value,
						minPrice: isNaN(minPriceInt) ? null : minPriceInt,
						maxPrice: isNaN(maxPriceInt) ? null : maxPriceInt,
					},
					(a: TutorResult[]) => {
						setTutors(a);
						setIsReady(true);
					},
				),
			);
		} catch (e) {
			console.log(e);
			return;
		}
	};

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
		<div className="flex h-200 gap-4">
			{/* Search Results */}
			<div className="min-w-1/3 bg-white">
				<Card>
					<CardContent>
						<form onSubmit={handleSearch} className="flex flex-col gap-2">
							<div className="flex pr-10 gap-4">
								<Input
									{...search}
									data-testid="search"
									placeholder="John Doe, Ellen Joe, etc."
								/>
								<button data-testid="search-button"> Search </button>
							</div>
							<div className="flex justify-between">
								<span>Price: </span>{" "}
								<Input {...minPrice} data-testid="minPrice" className="w-1/4" />
								<span> - </span>
								<Input {...maxPrice} data-testid="maxPrice" className="w-1/4" />
							</div>
						</form>
					</CardContent>
				</Card>
				<br />
				{isReady ? (
					<div className="flex flex-col flex-grow gap-2 max-h-160 overflow-y-auto">
						{tutors.length === 0
							? "No tutors found :(. The name or subject you're trying to find is non-existent. Try adjusting your filters instead. "
							: tutors.map((tutor) => {
									return (
										// biome-ignore lint/correctness/useJsxKeyInIterable: wtf is going on
										<TutorSearchResult
											{...tutor}
											callback={() => {
												setSelectedTutor(tutor);
											}}
										/>
									);
								})}
					</div>
				) : (
					<div>Searching...</div>
				)}
			</div>

			{/*Tutor Results*/}
			<div className="min-w-2/3 bg-white border-2 min-h-165 rounded">
				{selectedTutor ? (
					<div className="h-full overflow-y-auto">
						<div className="p-6 flex gap-5 border-b-2">
							<img
								src="https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg"
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

						<div className="bg-gray-100 w-full p-4 flex flex-col">
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
						<p className="w-full p-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
							laoreet fringilla rhoncus. Aliquam lacinia ullamcorper eros
							interdum dictum. Nam porta quis dolor sodales sodales. Ut sodales
							placerat mi a interdum. Aliquam rhoncus dolor sed ligula luctus
							sagittis. Nullam id urna quis orci lobortis tincidunt id nec
							massa. Quisque feugiat elementum hendrerit. Fusce vel nisi felis.
							Donec quis mauris ut ipsum interdum rutrum. Curabitur sit amet
							ultricies augue, vitae dignissim elit. Sed pellentesque gravida
							odio, fermentum fringilla massa malesuada ut. Aliquam non pulvinar
							lectus, a semper velit. Pellentesque eget nulla nec libero tempus
							feugiat. Aenean nec gravida neque. Maecenas accumsan pretium urna,
							eu varius nulla sagittis vitae. Morbi finibus diam vitae mi
							suscipit placerat. Quisque et leo ac lectus fringilla blandit.
							Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Nunc eu congue nulla. Sed et
							congue arcu, vitae imperdiet ex. Phasellus auctor, tortor vel
							venenatis lacinia, metus purus lacinia est, a bibendum turpis
							neque a libero. Pellentesque tincidunt vulputate malesuada. Proin
							at consequat nulla, id mattis turpis. Nullam consectetur eget arcu
							ut laoreet. Phasellus vestibulum turpis eget turpis tempor
							egestas. Fusce tempus odio erat, et egestas nunc imperdiet
							tristique. Aliquam sed sem et neque feugiat tempus. Phasellus sed
							bibendum nulla. Mauris dignissim leo enim, sit amet faucibus nulla
							hendrerit dapibus. Aenean nunc risus, feugiat in interdum id,
							tincidunt at tellus. Vivamus eu urna et risus faucibus vehicula.
							Donec eget nunc libero. Ut et pulvinar neque. Suspendisse potenti.
							Sed venenatis semper ante, at placerat risus cursus eu. Nunc
							cursus arcu non diam hendrerit, eu elementum urna accumsan. In
							molestie libero mi, quis lacinia nulla porta ut. Vestibulum cursus
							porta quam, eget dictum justo placerat vitae. Etiam vitae pretium
							arcu, eu auctor velit. Nam felis lorem, imperdiet id risus ut,
							tincidunt semper nisi. Mauris at odio at nisl imperdiet tincidunt.
							Cras urna lacus, pellentesque id leo at, ornare dignissim metus.
							Duis ac elementum velit. Donec ac ligula nulla. Pellentesque ex
							mi, pulvinar vel metus non, pulvinar venenatis dui. Nam efficitur
							felis velit, et imperdiet justo sodales quis. Vestibulum convallis
							elit a neque tincidunt ornare. Ut viverra nisl vel commodo
							ultrices. In at ullamcorper ex, volutpat dapibus erat. Aliquam
							commodo neque vitae scelerisque blandit. In arcu dolor, consequat
							vitae leo ut, pretium imperdiet nulla. Integer sit amet ipsum quis
							dolor pharetra mattis sit amet vel augue. Suspendisse potenti.
							Cras id dictum libero. Cras vel orci odio. Praesent non blandit
							leo. Sed est urna, gravida id egestas quis, mattis non massa.
							Vestibulum vel lorem arcu. Aenean consectetur quam sit amet ex
							dignissim tempus.
						</p>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center h-full">
						<img
							src="https://i.pinimg.com/236x/09/e9/88/09e9888ac74fb96cd4ed7a3829730fd9.jpg"
							alt=""
						/>

						<div className="mt-6">No Tutor Currently Selected </div>
						<div>
							<b>Please select a tutor from the left-hand side</b>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchForm;
