import { useDispatch } from "react-redux";
import { useField } from "../app/hooks";
import { AppDispatch } from "../app/store";
import { getTutors } from "../app/redux/userReducer";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";

import TutorSearchResult from "./TutorSearchResult";
import TutorDetails from "./TutorDetails";

import tutorService from "../services/tutor";
import { TutorResult } from "@/types/types";

import { Card, CardContent } from "../components/ui/card";
import { TEST } from "@/constants/constants";

const SearchForm = ({ initialQuery = "" }) => {
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
        query: initialQuery,
        minPrice: null,
        maxPrice: null,
      });
      setTutors(result);
      setIsReady(true);
    };

    getTutors();
  }, [initialQuery]);

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
          }
        )
      );
    } catch (e) {
      console.log(e);
      return;
    }
  };


  return (
    <div className="flex max-h-9/11 gap-4" data-testid={TEST.form("search")}>
      {/* Search Results */}
      <div className="min-w-1/3 h-100 bg-white">
        <Card>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col gap-2">
              <div className="flex pr-10 gap-4">
                <Input
                  {...search}
                  data-testid={TEST.input("search")}
                  placeholder="Jane Doe, Ellen Joe, etc."
                  className="placeholder:italic"
                />
                <button data-testid={TEST.button("search")}> Search </button>
              </div>
              <div className="flex justify-between">
                <span>Price: </span>{" "}
                <Input
                  {...minPrice}
                  data-testid={TEST.input("min-price")}
                  className="w-1/4"
                  min={0}
                />
                <span> - </span>
                <Input
                  {...maxPrice}
                  data-testid={TEST.input("max-price")}
                  className="w-1/4"
                  min={0}
                />
              </div>
            </form>
          </CardContent>
        </Card>
        <br />
        {isReady ? (
          <div className="flex flex-col flex-grow gap-2 max-h-full overflow-y-auto">
            {tutors.length === 0
              ? "No tutors found :(. The name or subject you're trying to find is non-existent. Try adjusting your filters instead. "
              : tutors.map((tutor) => {
                  return (
                    // biome-ignore lint/correctness/useJsxKeyInIterable: wtf is going on
                    <TutorSearchResult
                      key={tutor.id}
                      tutor={tutor}
                      onSelect={() => {
                        setSelectedTutor(tutor);
                      }}
                    />
                  );
                })}
          </div>
        ) : (
          <div data-testid={TEST.form("tutor-result")}>Searching...</div>
        )}
      </div>

      {/*Tutor Results*/}
      <div className="min-w-2/3 bg-white border-2 rounded flex flex-col h-140 overflow-auto">
        {selectedTutor ? (
          <TutorDetails selectedTutor={selectedTutor} />
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
