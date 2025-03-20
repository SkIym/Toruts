import axios from "axios";
import { API_ROUTES } from "../constants";
import { TutorInfo, TutorInfoWithoutId, TutorResult, TutorSearch } from "../types";


const create = async (username: string, creds: TutorInfoWithoutId) => {
    console.log("Requesting to create tutor account")

    const { portrait, ...primary } = creds;

    const { data } = await axios.post<TutorInfo>(`${API_ROUTES.TUTOR.create(username)}`, primary)

    if (portrait !== null) {

        const formData = new FormData();
        formData.append("portrait", portrait);
        const { data: dataWithUrl } = await axios.post<TutorInfo>(`${API_ROUTES.TUTOR.upload(data.id)}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        return dataWithUrl
    }
    return data
}

const search = async (query: TutorSearch) => {
    console.log("Searching tutors")
    const { data } = await axios.get<TutorResult[]>(`${API_ROUTES.TUTOR.search}`, { params: query })
    return data

}

const update = async (username: string, creds: TutorInfoWithoutId) => {
    console.log("Requresting to update tutor record")
    const { data } = await axios.put<TutorInfo>(`${API_ROUTES.TUTOR.update(username)}`, creds)
    return data;
}

const get = async (username: string) => {
    const { data } = await axios.get<TutorInfo>(`${API_ROUTES.TUTOR.get(username)}`)
    return data;
}

export default {
    create, search, update, get
}
