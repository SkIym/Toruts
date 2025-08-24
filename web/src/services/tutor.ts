import api from "./api";
import { API_ROUTES } from "../constants/constants";
import { TutorInfo, TutorInfoWithoutId, TutorResult, TutorSearch } from "../types/types";

const create = async (creds: TutorInfoWithoutId) => {
	console.log("Requesting to create tutor account")

	const { data } = await api.post<TutorInfo>(
		`${API_ROUTES.TUTOR.create()}`, 
		creds)
	return data
}

const upload = async (file: File) => {

	const formData = new FormData();
	formData.append("portrait", file);
	const { data } = await api.post<string>(
		`${API_ROUTES.TUTOR.upload()}`, 
		formData, 
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	
	return data
}

const search = async (query: TutorSearch) => {
	console.log("Searching tutors")
	const { data } = await api.get<TutorResult[]>(`${API_ROUTES.TUTOR.search}`, { params: query })
	return data

}

const update = async (creds: TutorInfoWithoutId) => {
	console.log("Requesting to update tutor record")
	const { data } = await api.put<TutorInfo>(
		`${API_ROUTES.TUTOR.update()}`, 
		creds)
	return data;
}

const get = async () => {
	const { data } = await api.get<TutorInfo>(
		`${API_ROUTES.TUTOR.get()}`)
	return data;
}

export default {
	create, search, update, get, upload
}
