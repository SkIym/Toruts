import { TutorComment, CreateComment } from "@/types/types";
import api from "./api";
import { API_ROUTES } from "@/constants/constants"

const post = async (comment: CreateComment) => {
	console.log("sending comment")
	const { data } = await api.post<CreateComment>(
		`${API_ROUTES.COMMENT.create()}`, 
		comment)
	return data
}

const get = async (tutorId: number) => {
	const { data } = await api.get<TutorComment[]>(`${API_ROUTES.COMMENT.get(tutorId)}`)
	return data
}

const remove = async (commentId: number) => {
	const { data } = await api.delete(
		`${API_ROUTES.COMMENT.delete(commentId)}`)
	return data
}

export default { post, get, remove }