import axios from "axios";
import { API_ROUTES } from "../constants";
import { CreateMatchInfo, StudentInfo } from "@/types";

// student users are the ones calling this
const create = async (username: string, creds: CreateMatchInfo) => {
    console.log("Requesting to create a match")
    const { data } = await axios.post<StudentInfo>(`${API_ROUTES.MATCH.create(username)}`, creds)
    return data
}

export default {
    create
}