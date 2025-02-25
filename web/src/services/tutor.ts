import axios from "axios";
import { serverURL } from "../constants";
import { TutorInfo, TutorInfoWithoutId, TutorResult, TutorSearch } from "../types";

const url = serverURL + "tutors"


const create = async (username: string, creds: TutorInfoWithoutId) => {
    console.log("Requesting to create tutor account")
    const { data } = await axios.post<TutorInfo>(`${url}/create/${username}`, creds)
    return data
}

const search = async (query: TutorSearch) => {
    console.log("Searching tutors")
    const { data } = await axios.get<TutorResult[]>(`${url}/search/`, { params: query })
    return data

}

export default {
    create, search
}
