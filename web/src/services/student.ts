import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { StudentInfo, StudentInfoWithoutId } from "../types/types";

const create = async (creds: StudentInfoWithoutId) => {
	console.log("Requesting to create student account")
	const { data } = await axios.post<StudentInfo>(
		`${API_ROUTES.STUDENT.create()}`, 
		creds, 
		{
			withCredentials: true
		})
	return data
}

const update = async (creds: StudentInfoWithoutId) => {
	console.log("Requesting to update student account")
	const { data } = await axios.put<StudentInfo>(
		`${API_ROUTES.STUDENT.update()}`, 
		creds, 
		{
			withCredentials: true
		})
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
	const { data } = await axios.get<StudentInfo>(
		`${API_ROUTES.STUDENT.get()}`, 
		{
			withCredentials: true
		})
	return data;
}
	
export default {
	create, update, find, get
}
