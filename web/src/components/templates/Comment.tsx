import { TutorComment } from "@/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from "../ui/button"
// import regular from '@fortawesome/free-regular-svg-icons'
import commentService from "@/services/comments"
import { useErrorNotification, useSuccessNotification } from "@/hooks"
import { useSelector } from "react-redux"
import { RootState } from "store"

const Rating = ({ v }) => {
    return (
        <div className="flex">
            {[...Array(v)].map((_, i) =>
                <FontAwesomeIcon icon={faStar} className="text-orange-300" />
            )}
            {[...Array(5 - v)].map((_, i) =>
                <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            )}
        </div>
    )
}

const Comment = ({ commentData, callback }) => {
    const user = useSelector((state: RootState) => state.user)
    console.log(user)
    console.log(commentData.commenterId)
    const userId = user?.roleInfo?.id

    return (
        <div className="border-2 p-6 rounded-2xl">
            <div className="w-full flex">
                <b className="text-2xl mb-2">{commentData.commenterFirstName} {commentData.commenterLastName}</b>
                {userId == commentData.commenterId ?

                    <div className="ml-auto">
                        <Button onClick={(e) => {
                            try {

                                commentService.remove(commentData.id).then(() => {
                                    callback()
                                })
                                useSuccessNotification("Successfully deleted comment")
                            } catch (e) {
                                useErrorNotification(e)

                            }
                        }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                    :
                    <div></div>
                }

            </div>

            <div className="flex justify-between w-4/5 items-center flex-row">
                <b>Pedagogy</b>
                <Rating v={commentData.pedagogy} />
                <b>Helpfulness</b>
                <Rating v={commentData.helpfulness} />
                <b>Easiness</b>
                <Rating v={commentData.easiness} />
            </div>
            <div className="mt-10">
                {commentData.text}
            </div>
        </div >
    )
}

export default Comment