import { TutorComment, CreateComment, UserData } from "@/types/types";
import axios from "axios";
import { API_ROUTES } from "@/constants/constants"
import accountService from "./account"

const post = async (comment: CreateComment, user: UserData) => {
    console.log("sending comment")
    const { data } = await axios.post<CreateComment>(`${API_ROUTES.COMMENT.create(user.userName)}`, comment, accountService.getConfig())

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