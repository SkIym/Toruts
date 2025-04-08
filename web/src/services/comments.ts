import { CreateComment, StudentInfo, UserData } from "@/types";
import axios from "axios";
import { API_ROUTES } from "@/constants"

const post = async (comment: CreateComment, user: UserData) => {
    console.log("sending comment")
    const { data } = await axios.post<CreateComment>(`${API_ROUTES.COMMENT.create(user.userName)}`, comment)

    return data
}

export default { post }