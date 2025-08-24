import api from "./api";
import { API_ROUTES } from "../constants/constants";
import { CreateMatchInfo, StudentInfo } from "@/types/types";

// student users are the ones calling this
const create = async (creds: CreateMatchInfo) => {
	console.log("Requesting to create a match")
	const { data } = await api.post<StudentInfo>(
		`${API_ROUTES.MATCH.create()}`, 
		creds)
	return data
}

export default {
	create
}