import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { AppDispatch } from "../../../store";
import { getTutors } from "../../reducers/userReducer";
import { TutorResult } from "../../types";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import TutorSearchResult from "./TutorSearchResult";

import tutorService from "../../services/tutor";

const SearchForm = () => {
	const { ...search } = useField("text");
	const { ...minPrice } = useField("number");
	const { ...maxPrice } = useField("number");

	const dispatch = useDispatch<AppDispatch>();

	const [tutors, setTutors] = useState<TutorResult[]>([]);
	const [isReady, setIsReady] = useState(false);

	const [selectedTutor, setSelectedTutor] = useState(null);

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

	return (
		<div className="flex h-200">
			{/* Search Results */}
			<div className="min-w-1/3">
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
					<br />
				</form>
				{isReady ? (
					<div className="flex flex-col flex-grow gap-2 max-h-160 overflow-y-auto">
						{tutors.length === 0
							? "No tutors found :(. The name or subject you're trying to find is non-existent. Try adjusting your filters instead. "
							: tutors.map((tutor) => {
									return <TutorSearchResult {...tutor} />;
								})}
					</div>
				) : (
					<div>Searching...</div>
				)}
			</div>

			{/*Tutor Results*/}
			<div className="min-w-2/3 p-6 bg-white border-black border-2 min-h-160">
				<div className="">Hello I am a tutor</div>
			</div>
		</div>
	);
};

export default SearchForm;
