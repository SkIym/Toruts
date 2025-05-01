import { TutorComment, CreateComment } from "@/types/types";
import axios from "axios";
import { API_ROUTES } from "@/constants/constants"
import accountService from "./account"

const post = async (comment: CreateComment) => {
	console.log("sending comment")
	const { data } = await axios.post<CreateComment>(`${API_ROUTES.COMMENT.create()}`, comment, accountService.getConfig())

	return data
}

const get = async (tutorId: number) => {
	const { data } = await axios.get<TutorComment[]>(`${API_ROUTES.COMMENT.get(tutorId)}`)
	return data
}

const remove = async (commentId: number) => {
	const { data } = await axios.delete(`${API_ROUTES.COMMENT.delete(commentId)}`, accountService.getConfig())
	return data
}

export default { post, get, remove }