
export interface SignupInfo {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
export interface LoginInfo {
    username: string;
    password: string;
}

export enum UserType {
    TUTOR = 0,
    STUDENT = 1,
}

export enum Status {
    Active = 0,
    Inactive = 1,
    Pending = 2
}

export enum LearningMode {
    Online = 0,
    F2F = 1,
    Hybrid = 2
}

export type UserData = {
    userName: string;
    email: string;
    userType: UserType | null;
    primaryInfo: UserInfo | null
    roleInfo: TutorInfo | StudentInfo | null
    dual: boolean;
}

export type UserInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export type StudentInfo = {
    id: number,
    areasOfImprovement: string[],
    degreeProgram?: string
    matchedTutors?: TutorMatchInfo[],
    displayConsent: boolean
}

export type StudentInfoWithoutId = Omit<StudentInfo, 'id'>

export interface TutorInfo {
    id: number,
    educAttainment: string,
    learningMode: number,
    venue: string,
    price: number,
    areasOfExpertise: string[],
    tutoringExperiences: string,
    availability: string,
    portraitUrl?: string,
    status: number,
    matchedStudents?: StudentMatchInfo[]
}

export function isTutorInfo(object: TutorInfo | StudentInfo): object is TutorInfo {
	return 'price' in object;
}

export type TutorInfoUpload = Omit<TutorInfo, 'portraitUrl'>

export type TutorResult = TutorInfo & { firstName: string, lastName: string, phoneNumber: string }

export type TutorInfoWithoutId = Omit<TutorInfoUpload, 'id'>

export interface ToggleObject {
    toggleVisibility: () => void
    setInvisible: () => void
}

export type TutorSearch = {
    query: string,
    minPrice: number | null,
    maxPrice: number | null
}

export interface CreateMatchInfo {
    tutorId: number,
    subject: string,
    price: number,
}

export interface StudentMatchInfo {
    id: number,
    firstName: string,
    lastName: string
}

export interface TutorMatchInfo {
    id: number,
    firstName: string,
    lastName: string,
    portraitUrl?: string
}

export interface CreateComment { // when POSTing
    tutorId: number,
    text: string,
    helpfulness: number,
    pedagogy: number,
    easiness: number
}

export interface TutorComment { // when GETting
    id: number,
    commenterFirstName: string,
    commenterLastName: string,
    commenterId: number,
    text: string,
    helpfulness: number,
    pedagogy: number,
    easiness: number
}