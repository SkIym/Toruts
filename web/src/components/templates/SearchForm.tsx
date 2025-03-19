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
		<div>
			<span>Search Tutors</span>
			<form onSubmit={handleSearch}>
				<span>Search</span>
				{/*<input {...search} data-testid="search" /> <br />*/}
				<Input {...search} data-testid="search" />
				<br />
				<span>Filter</span>
				<br />
				<span>Price: </span> <input {...minPrice} data-testid="minPrice" /> -{" "}
				<input {...maxPrice} data-testid="maxPrice" />
				<button data-testid="search-button"> Search </button>
			</form>

			{isReady ? (
				<div data-testid="form" id="search-form">
					<br />
					<br />

					<div className="grid grid-cols-3 gap-10 ">
						{tutors.length === 0
							? "No tutors found :(. The name or subject you're trying to find is non-existent. Try adjusting your filters instead. "
							: tutors.map((tutor) => {
									return <TutorSearchResult {...tutor} />;
								})}
					</div>
				</div>
			) : (
				<div>Searching...</div>
			)}
		</div>
	);
};

export default SearchForm;
