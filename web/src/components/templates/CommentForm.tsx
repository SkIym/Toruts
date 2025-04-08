import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { useField } from "@/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const CommentForm = () => {
    const dispatch = useDispatch<AppDispatch>()

    const CommentSchema = z.object({
        pedagogy: z.number().min(1).max(5),
        helpfulness: z.number().min(1).max(5),
        easiness: z.number().min(1).max(5),
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