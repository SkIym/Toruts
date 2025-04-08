import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { useField } from "@/hooks";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { uploadComment } from "@/reducers/userReducer";
import tutor from "@/services/tutor";
import { isTutorInfo } from "@/types";

const clamp = (value: number, a: number, b: number) => {
    if (value > a && value < b) {
        return value
    }

    if (value < a) {
        return a
    } else {
        return b
    }

}

const CommentForm = ({ tutorId, ...props }) => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)

    const CommentSchema = z.object({
        pedagogy: z.number(),
        helpfulness: z.number(),
        easiness: z.number(),
        comment: z.string().nonempty({ message: "required" })
    })

    type CommentSchemaType = z.infer<typeof CommentSchema>

    const commentForm = useForm<CommentSchemaType>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            pedagogy: 1,
            helpfulness: 1,
            easiness: 1,
        }
    })

    const handleCommentSubmit: SubmitHandler<CommentSchemaType> = async (formData) => {
        // TODO: force this at the schema instead
        // clamp the numbers because zod does not like the min/max things

        formData.easiness = clamp(formData.easiness, 1, 5)
        formData.helpfulness = clamp(formData.helpfulness, 1, 5)
        formData.pedagogy = clamp(formData.pedagogy, 1, 5)

        try {
            if (user?.roleInfo == undefined || user?.roleInfo == null) {
                return
            }

            if (isTutorInfo(user.roleInfo)) {
                return
            }

            await dispatch(uploadComment({
                tutorId: tutorId,
                text: formData.comment,
                helpfulness: formData.helpfulness,
                pedagogy: formData.pedagogy,
                easiness: formData.easiness,
            }, user))

        } catch {

        }

        console.log(formData)
    }

    return (
        <Form {...commentForm} >
            <form
                className="items-end mb-10"
                onSubmit={commentForm.handleSubmit(handleCommentSubmit)}
                id="comment-form"
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
                                    />
                                </FormControl>

                            </FormItem>
                        )} />

                    <FormField
                        control={commentForm.control}
                        name="helpfulness"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Helpfulness</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />

                    <FormField
                        control={commentForm.control}
                        name="easiness"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Easiness</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                </div>

                <FormField control={commentForm.control} name="comment" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea placeholder="Type your comment here" className="mb-5" {...field} />
                        </FormControl>

                    </FormItem>

                )} />

                <Button type="submit">Post Comment</Button>
            </form>
        </Form>
    )
}

export default CommentForm