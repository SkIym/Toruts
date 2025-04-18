import { TutorResult } from "@/types/types";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { TEST } from "@/constants/constants";

const defaultPicture =
  "https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg";

const TutorSearchResult = ({ tutor, callback }: { tutor: TutorResult }) => {
  return (
    <div>
      <Card
        onClick={callback}
        className="hover:bg-gray-50"
        data-testid={TEST.card("tutor")}
      >
        <CardHeader>
          <b>
            {tutor.firstName} {tutor.lastName}
          </b>
        </CardHeader>
        <CardContent className="flex gap-10">
          <img
            // src="https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg"
            src={
              tutor.portraitUrl !== "None" ? tutor.portraitUrl : defaultPicture
            }
            alt=""
            className="h-20 w-20 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span>{tutor.price} PHP</span>
            <span>{tutor.availability}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorSearchResult;
