import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { logoutUser, deleteUser, switchMode } from "../../reducers/userReducer";
import { useNavigate, Link } from "react-router-dom";
import { StudentInfo, TutorInfo, UserType } from "../../types";
import TutorProfile from "../templates/TutorProfile";
import { PATH, TEST } from "@/constants";

import StudentProfile from "../templates/StudentProfile";
import Navbar from "../ui/navbar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";

import { Button } from "../ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogCancel,
} from "../ui/alert-dialog";

const ProfilePage = () => {
	const user = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const handleLogout = async () => {
		console.log("Handling logout..");
		try {
			await dispatch(logoutUser());
			navigate(`${PATH.login}`);
		} catch {
			//
		}
	};

	const handleDelete = async () => {
		console.log("Handling deletion...");
		try {
			const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
			if (loggedInUserJSON == null) {
				throw "not logged in";
			}

			await dispatch(deleteUser(JSON.parse(loggedInUserJSON)));
		} catch {
			//
		}
	};

	const handleSwitch = async () => {
		console.log(user);
		if (user) {
			const userType = user.userType;
			if (userType !== null) {
				try {
					console.log("Handling switching modes");
					const toUserType =
						userType === UserType.STUDENT ? UserType.TUTOR : UserType.STUDENT;
					await dispatch(switchMode(toUserType, user?.userName));
				} catch {
					return;
				}
			}
		}
	};

	const handleSignup = async () => {
		if (user) {
			console.log(user);
			if (user.userType == UserType.TUTOR) {
				navigate(PATH.SIGNUP.student);
			} else {
				navigate(PATH.SIGNUP.tutor);
			}
		}
	};

	// console.log(user?.primaryInfo, user?.roleInfo, user?.type)
	console.log(user);
	const primaryInfo = user?.primaryInfo;
	const roleInfo = user?.roleInfo;

	return (
		<div data-testid={TEST.page("profile")} className="w-full">
			<Navbar />

			<div className="p-10 pl-30 pr-30 flex w-full justify-center gap-5">
				<Card className="w-2/3">
					<CardHeader>
						<b>
							{user?.primaryInfo?.firstName} {user?.primaryInfo?.lastName}
						</b>
						<Avatar>
							{user?.userType == UserType.TUTOR ? (
								<AvatarImage src={user?.roleInfo.portraitUrl} />
							) : (
								<AvatarImage />
							)}
						</Avatar>
					</CardHeader>
					<CardContent>
						<div>
							<span>First Name: {primaryInfo?.firstName}</span>
						</div>
						<div>
							<span>Last Name: {primaryInfo?.lastName}</span>
						</div>
						<div>
							<span>Phone Number: {primaryInfo?.phoneNumber}</span>
						</div>
						<div>
							{" "}
							{user?.userType == UserType.TUTOR ? (
								<TutorProfile info={roleInfo as TutorInfo}></TutorProfile>
							) : user?.userType == UserType.STUDENT ? (
								<StudentProfile info={roleInfo as StudentInfo}></StudentProfile>
							) : null}
						</div>
						<div>
							{user?.dual ? (
								<Button
									data-testid={TEST.button("switch")}
									onClick={handleSwitch}
								>
									{user?.userType === UserType.TUTOR
										? "Switch to Student Mode"
										: "Switch to Tutor Mode"}
								</Button>
							) : (
								<Button
									data-testid={TEST.button("signup")}
									onClick={handleSignup}
								>
									{user?.userType === UserType.TUTOR
										? "Sign up as a student"
										: "Sign up as a tutor"}
								</Button>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="w-1/3">
					<CardHeader>Lmao</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-3">
							<Button
								data-testid={TEST.button("edit")}
								onClick={() => navigate(`${PATH.PROFILE.edit}`)}
							>
								Edit Profile
							</Button>
							<AlertDialog>
								<AlertDialogTrigger>Delete Profile</AlertDialogTrigger>

}

export default ProfilePage;
