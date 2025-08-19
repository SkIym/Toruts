import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { CreateMatchInfo, StudentInfo } from "@/types/types";

// student users are the ones calling this
const create = async (creds: CreateMatchInfo) => {
	console.log("Requesting to create a match")
	const { data } = await axios.post<StudentInfo>(
		`${API_ROUTES.MATCH.create()}`, 
		creds, 
		{
			withCredentials: true
		})
	return data
}

export default {
	create
}