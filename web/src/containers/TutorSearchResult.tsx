import { LearningMode, TutorResult } from "@/types/types";
import { Card, CardHeader, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEST } from "@/constants/constants";

const defaultPicture =
  "https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg";

interface Props {
    tutor: TutorResult
    onSelect: () => void
}

const getLearningMode = (learningMode: LearningMode) => {
    if (learningMode === 0) {
      return <div>Online</div>;
    }
    if (learningMode === 1) {
      return <div>F2F</div>;
    }
    return <div>Hybrid</div>;
  };



const TutorSearchResult = ({ tutor, onSelect }: Props) => {

  return (
    <div>
      <Card
        onClick={onSelect}
        className="hover:bg-gray-50 gap-5 hover:cursor-pointer wrap-anywhere border-1 hover:border-primary/70"
        data-testid={TEST.card("tutor")}
      >
        <CardHeader className="flex items-center gap-5">
            <img
            // src="https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg"
            src={
              tutor.portraitUrl !== "None" ? tutor.portraitUrl : defaultPicture
            }
            alt=""
            className="h-15 w-15 rounded-full object-cover"
            />
            <div>
                <b>
                {tutor.firstName} {tutor.lastName}
            </b>
            <CardDescription>
                {tutor.educAttainment}
                {getLearningMode(tutor.learningMode)}
            </CardDescription>
            </div>
            
        </CardHeader>
        <CardContent className="flex flex-row gap-2 flex-wrap">
          <Badge variant="secondary" className="border-rose-100"> &#8369; {tutor.price}</Badge>
          <div className="flex gap-2">
            {tutor.areasOfExpertise.map((exp: string) => (
                <Badge className="border-rose-100" variant="default">{exp}</Badge>
            ))}
            
          </div>
          <Badge className="border-rose-100" variant="default">{tutor.availability}</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorSearchResult;
