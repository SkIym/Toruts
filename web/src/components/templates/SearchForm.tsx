import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { AppDispatch } from "../../../store";
import { getTutors } from "../../reducers/userReducer";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

import TutorSearchResult from "./TutorSearchResult";
import TutorDetails from "./TutorDetails";

import tutorService from "../../services/tutor";
import { LearningMode, TutorResult } from "@/types";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "@/components/ui/button";

import { DialogContent } from "@radix-ui/react-dialog";

const defaultPicture =
	"https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg";

const SearchForm = () => {
	const { ...search } = useField("text");
	const { ...minPrice } = useField("number");
	const { ...maxPrice } = useField("number");

	const dispatch = useDispatch<AppDispatch>();

	const [tutors, setTutors] = useState<TutorResult[]>([]);
	const [isReady, setIsReady] = useState(false);

	const [isApplying, setApplying] = useState(false);

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
									placeholder="Jane Doe, Ellen Joe, etc."
									className="placeholder:italic"
								/>
								<button data-testid="search-button"> Search </button>
							</div>
							<div className="flex justify-between">
								<span>Price: </span>{" "}
								<Input
									{...minPrice}
									data-testid="minPrice"
									className="w-1/4"
									min={0}
								/>
								<span> - </span>
								<Input
									{...maxPrice}
									data-testid="maxPrice"
									className="w-1/4"
									min={0}
								/>
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
					<TutorDetails
						selectedTutor={selectedTutor}
						callback={() => {
							setApplying(!isApplying);
						}}
					/>
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
