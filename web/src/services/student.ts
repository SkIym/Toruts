import api from "./api";
import { API_ROUTES } from "../constants/constants";
import { StudentInfo, StudentInfoWithoutId } from "../types/types";

const create = async (creds: StudentInfoWithoutId) => {
	console.log("Requesting to create student account")
	const { data } = await api.post<StudentInfo>(
		`${API_ROUTES.STUDENT.create()}`, 
		creds)
	return data
}

const update = async (creds: StudentInfoWithoutId) => {
	console.log("Requesting to update student account")
	const { data } = await api.put<StudentInfo>(
		`${API_ROUTES.STUDENT.update()}`, 
		creds)
	return data
}

const find = async () => {
	const { data } = await api.get<StudentInfo | null>(`${API_ROUTES.STUDENT.get()}`)
	if (data) {
		return true
	} else {
		return false
	}
}

const get = async () => {
	const { data } = await api.get<StudentInfo>(
		`${API_ROUTES.STUDENT.get()}`)
	return data;
}
	
export default {
	create, update, find, get
}
