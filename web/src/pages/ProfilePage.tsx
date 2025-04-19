import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logoutUser, deleteUser, switchMode } from "../app/redux/userReducer";
import { useNavigate, Link } from "react-router-dom";
import { StudentInfo, TutorInfo, UserType } from "../types/types";
import TutorProfile from "../containers/TutorProfile";
import { PATH, TEST } from "@/constants/constants";

import StudentProfile from "../containers/StudentProfile";
import Navbar from "../components/ui/navigationBar";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Avatar, AvatarImage } from "../components/ui/avatar";

import { Button } from "../components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogCancel,
} from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

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
			<div className="p-10 pl-30 pr-30 flex w-full justify-center gap-5">
				<Card className="w-3/4">
					<CardHeader>
						<b className="text-2xl">
							Welcome Back {user?.primaryInfo?.firstName}!
						</b>
					</CardHeader>
					<CardContent>
						<div className="flex w-full gap-5 items-center">
							<Avatar className="w-25 h-25">
								{user?.userType == UserType.TUTOR ? (
									<AvatarImage src={user?.roleInfo.portraitUrl} width={100} />
								) : (
									<AvatarImage
										src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
										width={100}
									/>
								)}
							</Avatar>
							<div className="ml-16 w-1/4">
								<Label>First Name</Label>
								<Input disabled value={primaryInfo?.firstName} data-testid={TEST.input('first-name')} />
							</div>
							<div className="w-1/4">
								<Label>Last Name</Label>
								<Input disabled value={primaryInfo?.lastName} data-testid={TEST.input('last-name')} />
							</div>
							<div className="w-1/4">
								<Label>Phone Number</Label>
								<Input disabled value={primaryInfo?.phoneNumber} data-testid={TEST.input('phone-number')} />
							</div>
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

				<Card className="w-1/4">
					<CardHeader>
						<b>Profile</b>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-3">
							<Button
								data-testid={TEST.button("edit")}
								onClick={() => navigate(`${PATH.PROFILE.edit}`)}
							>
								Edit Profile
							</Button>
							<AlertDialog>
								<AlertDialogTrigger>
									<Button className="w-full" data-testid={TEST.button("delete-trigger")} variant="default">Delete Profile</Button>
								</AlertDialogTrigger>

								<AlertDialogContent>
									<AlertDialogHeader>Are you sure?</AlertDialogHeader>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
									<AlertDialogFooter>
										<AlertDialogCancel data-testid={TEST.button("cancel")}>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={handleDelete} data-testid={TEST.button("delete")}>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<Button
								data-testid={TEST.button("logout")}
								onClick={handleLogout}
							>
								Logout
							</Button>{" "}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
