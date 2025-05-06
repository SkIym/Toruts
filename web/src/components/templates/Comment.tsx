import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from "../ui/button"
// import regular from '@fortawesome/free-regular-svg-icons'
import commentService from "@/services/comments"
import { useErrorNotification, useSuccessNotification } from "@/app/hooks"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { TutorComment } from '@/types/types'
import { TEST } from '@/constants/constants'

const Rating = ({ v }: {v: number}) => {
	return (
		<div className="flex">
			{[...Array(v)].map((_, i) =>
				<FontAwesomeIcon key={i} icon={faStar} className="text-orange-300" />
			)}
			{[...Array(5 - v)].map((_, i) =>
				<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-400" />
			)}
		</div>
	)
}

interface Props {
	commentData: TutorComment,
	onCommentDelete: () => void
}

const Comment = ({ commentData, onCommentDelete }: Props) => {
	const user = useSelector((state: RootState) => state.user)
	const userId = user?.roleInfo?.id
	const showSucess = useSuccessNotification();
	const showError = useErrorNotification(); 

	const handleDelete = async () => {
		try {
			await commentService.remove(commentData.id)
			onCommentDelete()
			showSucess("Successfully deleted comment")
		} catch (e) {
			showError(e)

		}
	}

	return (
		<div className="border-2 p-6 rounded-2xl">
			<div className="w-full flex">
				<b className="text-2xl mb-2">{commentData.commenterFirstName} {commentData.commenterLastName}</b>
				{userId == commentData.commenterId ?

					<div className="ml-auto">
						<Button onClick={handleDelete} data-testid={TEST.button('delete')}>
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