export const SERVER_URL = 'http://localhost:5177/api/'
export const API_ROUTES =
{
	ACCOUNT:
    {
    	login: `${SERVER_URL}account/login`
    	, signup: `${SERVER_URL}account/signup`
    }
	, RECORD:
    {
    	update: () => { return `${SERVER_URL}record/update/` }
    	, delete: () => { return `${SERVER_URL}record/delete/` }
    }
	, STUDENT:
    {
    	update: () => { return `${SERVER_URL}student/update/` }
    	, get: () => { return `${SERVER_URL}student/get/` }
    	, create: () => { return `${SERVER_URL}student/create/` }
    }
	, TUTOR:
    {
    	update: () => { return `${SERVER_URL}tutors/update/` }
    	, get: () => { return `${SERVER_URL}tutors/get/` }
    	, create: () => { return `${SERVER_URL}tutors/create/` }
    	, upload: () => `${SERVER_URL}tutors/upload/portrait/`
    	, search: `${SERVER_URL}tutors/search/`
    }
	, MATCH:
    {
    	create: () => `${SERVER_URL}matches/create/`
    }
	, COMMENT:
    {
    	create: () => `${SERVER_URL}comments/create/`
    	, get: (id: number) => `${SERVER_URL}comments/tutor/${id}`
    	, delete: (id: number) => `${SERVER_URL}comments/delete/${id}`
    }
}
export const PATH =
{
	home: '/'
	, login: '/login'
	, select: '/select'
	, SIGNUP:
    {
    	default: '/signup'
    	, tutor: '/signup/tutor'
    	, student: '/signup/student'
    }
	, PROFILE:
    {
    	default: '/profile'
    	, edit: '/profile/edit'
    }
}

export const TEST =
{
	page: (page: string) => `${page}-page`
	, form: (form: string) => `${form}-form`
	, button: (button: string) => `${button}-button`
	, input: (input: string) => `${input}-input`
	, select: (select: string) => `${select}-select`
	, profile: (profile: string) => `${profile}-profile`
	, card: (card: string) => `${card}-card`
	, radio: (radio: string) => `${radio}-radio`
	, link: (link: string) => `${link}-link`
	, checkbox: (checkbox: string) => `${checkbox}-checkbox`
}
export const PORTRAIT =
{
	default: 'https://wzyrtbjdztiuwvspkoge.supabase.co/storage/v1/object/public/profile-pictures//default.jpg'
}