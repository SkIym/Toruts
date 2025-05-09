import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useErrorNotification } from "@/app/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";
import { uploadComment } from "@/app/redux/userReducer";

import { isTutorInfo } from "@/types/types";
import { useEffect, useState } from "react";
import { TEST } from "@/constants/constants";

interface Props {
  tutorId: number;
  onCommentPost: () => void;
}

const CommentForm = ({ tutorId, onCommentPost }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.user);

	const showError = useErrorNotification();
	const [badWords, setBadWords] = useState<string[]>([]);

	useEffect(() => {
		fetch("../../badwords.txt")
			.then((res) => res.text())
			.then((text) => text.split("\n"))
			.then((words) => setBadWords(words))
			.catch((e) => console.error(e));
	}, []);

	const CommentSchema = z.object({
		pedagogy: z.coerce.number().min(1).max(5),
		helpfulness: z.coerce.number().min(1).max(5),
		easiness: z.coerce.number().min(1).max(5),
		comment: z.string().nonempty({ message: "required" }),
	});

  type CommentSchemaType = z.infer<typeof CommentSchema>;

  const commentForm = useForm<CommentSchemaType>({
  	resolver: zodResolver(CommentSchema),
  	defaultValues: {
  		pedagogy: 1,
  		helpfulness: 1,
  		easiness: 1,
  	},
  });

  const handleCommentSubmit: SubmitHandler<CommentSchemaType> = async (
  	formData
  ) => {
  	try {
  		if (user?.roleInfo == undefined || user?.roleInfo == null) {
  			return;
  		}

  		console.log("Helo");
  		if (isTutorInfo(user.roleInfo)) {
  			return;
  		}

  		for (const badword of badWords) {
  			const re = new RegExp(`${badword}`, "gi");

  			if (formData.comment.match(re)) {
  				throw new Error("Don't say bad words");
  			}
  		}

  		await dispatch(
  			uploadComment(
  				{
  					tutorId: tutorId,
  					text: formData.comment,
  					helpfulness: formData.helpfulness,
  					pedagogy: formData.pedagogy,
  					easiness: formData.easiness,
  				}
  			)
  		);

  		onCommentPost();
  	} catch (e) {
  		commentForm.setValue("comment", "");
  		showError(e);
  		// useSuccessNotification("Don't say bad words")
  	}

  	console.log(formData);
  };

  return (
  	<Form {...commentForm}>
  		<form
  			className="items-end mb-5"
  			onSubmit={commentForm.handleSubmit(handleCommentSubmit)}
  			id="comment-form"
  			data-testid={TEST.form("comment")}
  		>
  			<div className="flex mb-5 mt-5 gap-2">
  				<FormField
  					control={commentForm.control}
  					name="pedagogy"
  					render={({ field }) => (
  						<FormItem>
  							<FormLabel>Pedagogy</FormLabel>
  							<FormControl>
  								<Input
  									{...field}
  									type="number"
  									data-testid={TEST.input("pedagogy")}
  								/>
  							</FormControl>
  							<FormMessage />
  						</FormItem>
  					)}
  				/>

  				<FormField
  					control={commentForm.control}
  					name="helpfulness"
  					render={({ field }) => (
  						<FormItem>
  							<FormLabel>Helpfulness</FormLabel>
  							<FormControl>
  								<Input
  									type="number"
  									{...field}
  									data-testid={TEST.input("helpfulness")}
  								/>
  							</FormControl>
  						</FormItem>
  					)}
  				/>

  				<FormField
  					control={commentForm.control}
  					name="easiness"
  					render={({ field }) => (
  						<FormItem>
  							<FormLabel>Easiness</FormLabel>
  							<FormControl>
  								<Input
  									type="number"
  									{...field}
  									data-testid={TEST.input("easiness")}
  								/>
  							</FormControl>
  						</FormItem>
  					)}
  				/>
  			</div>

  			<FormField
  				control={commentForm.control}
  				name="comment"
  				render={({ field }) => (
  					<FormItem>
  						<FormControl>
  							<Textarea
  								placeholder="Type your comment here"
  								className="mb-5"
  								{...field}
  								data-testid={TEST.input("comment")}
  							/>
  						</FormControl>
  					</FormItem>
  				)}
  			/>

  			<Button type="submit" data-testid={TEST.button("submit")}>
          Post Comment
  			</Button>
  		</form>
  	</Form>
  );
};

export default CommentForm;
