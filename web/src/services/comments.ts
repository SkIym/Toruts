import { TutorComment, CreateComment, StudentInfo, TutorInfo, UserData } from "@/types";
import axios from "axios";
import { API_ROUTES } from "@/constants"

const post = async (comment: CreateComment, user: UserData) => {
    console.log("sending comment")
    const { data } = await axios.post<CreateComment>(`${API_ROUTES.COMMENT.create(user.userName)}`, comment)

    return data
}

const get = async (tutorId: number) => {
    const { data } = await axios.get<TutorComment[]>(`${API_ROUTES.COMMENT.get(tutorId)}`)
    return data
}

const remove = async (commentId: number) => {
    const { data } = await axios.get(`${API_ROUTES.COMMENT.delete(commentId)}`)
    return data
}

export default { post, get, remove }