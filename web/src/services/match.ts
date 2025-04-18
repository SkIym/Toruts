import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { CreateMatchInfo, StudentInfo } from "@/types/types";
import accountService from "./account"

// student users are the ones calling this
const create = async (username: string, creds: CreateMatchInfo) => {
    console.log("Requesting to create a match")
    const { data } = await axios.post<StudentInfo>(`${API_ROUTES.MATCH.create()}`, creds, accountService.getConfig())
    return data
}

export default {
    create
}