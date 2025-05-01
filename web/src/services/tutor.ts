import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { TutorInfo, TutorInfoWithoutId, TutorResult, TutorSearch } from "../types/types";
import accountService from "./account"

const create = async (username: string, creds: TutorInfoWithoutId) => {
	console.log("Requesting to create tutor account")

	const { data } = await axios.post<TutorInfo>(`${API_ROUTES.TUTOR.create()}`, creds, accountService.getConfig())
	return data
}

const upload = async (file: File) => {

	const formData = new FormData();
	formData.append("portrait", file);
	const { data } = await axios.post<string>(`${API_ROUTES.TUTOR.upload()}`, formData, accountService.getConfig({
		'Content-Type': 'multipart/form-data'
	})
	)
	return data
}

const search = async (query: TutorSearch) => {
	console.log("Searching tutors")
	const { data } = await axios.get<TutorResult[]>(`${API_ROUTES.TUTOR.search}`, { params: query })
	return data

}

const update = async (creds: TutorInfoWithoutId) => {
	console.log("Requesting to update tutor record")
	const { data } = await axios.put<TutorInfo>(`${API_ROUTES.TUTOR.update()}`, creds, accountService.getConfig())
	return data;
}

const get = async () => {
	const { data } = await axios.get<TutorInfo>(`${API_ROUTES.TUTOR.get()}`, accountService.getConfig())
	return data;
}

export default {
	create, search, update, get, upload
}
