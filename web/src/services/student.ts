import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { StudentInfo, StudentInfoWithoutId } from "../types/types";
import accountService from "./account"

const create = async (creds: StudentInfoWithoutId) => {
	console.log("Requesting to create student account")
	const { data } = await axios.post<StudentInfo>(`${API_ROUTES.STUDENT.create()}`, creds, accountService.getConfig())
	return data
}

const update = async (creds: StudentInfoWithoutId) => {
	console.log("Requesting to update student account")
	const { data } = await axios.put<StudentInfo>(`${API_ROUTES.STUDENT.update()}`, creds, accountService.getConfig())
	return data
}

const find = async () => {
	const { data } = await axios.get<StudentInfo | null>(`${API_ROUTES.STUDENT.get()}`)
	if (data) {
		return true
	} else {
		return false
	}
}

const get = async () => {
	const { data } = await axios.get<StudentInfo>(`${API_ROUTES.STUDENT.get()}`, accountService.getConfig())
	return data;
}
    
export default {
	create, update, find, get
}
