import { TutorComment } from "@/types"

const Comment = ({ commentData }) => {
    return (
        <div className="border-2 p-6 rounded-2xl">

            <b className="text-2xl">{commentData.commenterFirstName} {commentData.commenterLastName}</b>
            <div className="flex justify-between w-4/5">
                <b>Pedagogy</b>
                <div>☆★★☆★</div>
                <b>Helpfulness</b>
                <div>☆★★☆★</div>
                <b>Easiness</b>
                <div>☆★★☆★</div>
            </div>
            <div className="mt-10">
                {commentData.text}
            </div>
        </div>
    )
}

export default Comment