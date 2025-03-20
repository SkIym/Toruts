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
			<div className="min-w-1/3 bg-gray-50">
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
										// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
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
					<div>
						<div className="p-6 flex gap-5">
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
						<div className="w-full p-4 flex flex-col">
							<b>Prior Experience</b>
							<p>{selectedTutor.tutoringExperiences}</p>
						</div>
					</div>
				) : (
					<div>Please select a tutor</div>
				)}
			</div>
		</div>
	);
};

export default SearchForm;
