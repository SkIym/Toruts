import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { signAsTutor, updateAsTutor } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { LearningMode, Status, TutorInfo } from "../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const TutorSchema = z.object({
    educAttainment: z
        .string()
        .nonempty({ message: "required"})
        .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
    venue: z    
        .string()
        .nonempty({ message: "required"})
        .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
    price: z
        .coerce.number(),
    areasExp: z
        .coerce.string()
        .nonempty({ message: "required"})
        .transform((s) => s.toLowerCase().split(areasOfExpSeparator)),
    tutorExp: z
        .string()
        .or(z.literal('')),
    avail: z
        .string()
        .or(z.literal('')),
    portrait: z
        .custom<File>()
        .optional(),
    mode: z
        .string(),
    status: z
        .string()
})

type TutorSchemaType = z.infer<typeof TutorSchema>

type Props = {
    info?: TutorInfo
}

const areasOfExpSeparator = " "

const TutorForm = ({ info }: Props) => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const tutorForm = useForm<TutorSchemaType>({
        defaultValues: info ? {
            educAttainment: info.educAttainment,
            venue: info.venue,
            price: info.price,
            areasExp: info.areasOfExpertise.join(' '),
            tutorExp: info.tutoringExperiences,
            avail: info.availability,
            portrait: info.portraitUrl,
            mode: info.learningMode.toString(),
            status: info.status.toString()
        }: undefined,
        resolver: zodResolver(TutorSchema),
    });

    const handleSubmit: SubmitHandler<TutorSchemaType> = async (formData) => {
        console.log("HELLO?")
        
        try {
            if (info && user) {
                await dispatch(updateAsTutor(
                    user.userName,
                    {
                        educAttainment: formData.educAttainment,
                        learningMode: parseInt(formData.mode),
                        venue: formData.venue,
                        price: formData.price,
                        areasOfExpertise: formData.areasExp,
                        tutoringExperiences: formData.tutorExp,
                        availability: formData.avail,
                        portraitUrl: formData.portrait,
                        status: parseInt(formData.status)
                    }))
            }
            // create
            else if (user) {
                console.log('WDA')
                await dispatch(signAsTutor(
                    user.userName,
                    {
                        educAttainment: formData.educAttainment,
                        learningMode: parseInt(formData.mode),
                        venue: formData.venue,
                        price: formData.price,
                        areasOfExpertise: formData.areasExp,
                        tutoringExperiences: formData.tutorExp,
                        availability: formData.avail,
                        portraitUrl: formData.portrait,
                        status: parseInt(formData.status)
                    }))
            }
            navigate("/");
        } catch {
            console.log("AWEGAKSHDG")
            return;
        }
    }

    console.log(tutorForm.formState.errors);
    console.log(tutorForm.getValues())
    return <div>
        <Card>
            <CardHeader>
            <CardTitle className="text-2xl">{info ? "Edit" : "Signing up as a tutor"}</CardTitle>
            <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
        <Form {...tutorForm}>
            <form 
                onSubmit={tutorForm.handleSubmit(handleSubmit)}
                id="tutor-form"
                className="space-y-8">
                <div className="align-middle flex justify-center">
                <FormField
                    control={tutorForm.control}
                    name="portrait"
                    render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row justify-between"> 
                            <FormLabel>Profile Picture (optional)</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                        <Input
                            id="picture"
                            type="file"
                            {...field}
                            data-test-id="picture"
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
                </div>
              <div className="grid md:grid-cols-2 gap-5 w-2xl">
              <FormField
                  control={tutorForm.control}
                  name="educAttainment"
                  render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row justify-between"> 
                            <FormLabel>Educational Attainment</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                        <Input
                            placeholder="Educational Attainment"
                            {...field}
                            data-test-id="educ-attainment"
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
              <FormField
                    control={tutorForm.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row justify-between"> 
                            <FormLabel>Price (per hour)</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                        <Input
                            placeholder="Price"
                            {...field}
                            data-test-id="price"
                            type="number"
                            defaultValue={info ? info.price.toString() : undefined}
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
              </div>
              <FormField
                    control={tutorForm.control}
                    name="mode"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex flex-row justify-between"> 
                            <FormLabel>Learning Mode</FormLabel>
                            <FormMessage />
                        </div>
                        <Select onValueChange={field.onChange} defaultValue={
                            info ? info.learningMode.toString() : undefined
                        }>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your offered mode of learning" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="0">Online</SelectItem>
                            <SelectItem value="1">F2F</SelectItem>
                            <SelectItem value="2">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>                 
                        </FormItem>
                        )}
                    />
              <div className="grid grid-cols-2 gap-5 justify-evenly">
                <FormField
                        control={tutorForm.control}
                        name="venue"
                        render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row justify-between"> 
                                <FormLabel>Venue</FormLabel>
                                <FormMessage />
                            </div>
                            <FormControl>
                            <Input
                                placeholder="Venue"
                                {...field}
                                data-test-id="venue"
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                <FormField
                  control={tutorForm.control}
                  name="avail"
                  render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row justify-between"> 
                            <FormLabel>Availability</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                        <Input
                            placeholder="Availability"
                            {...field}
                            data-test-id="availability"
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
              </div>
              <div className="grid gap-5">
                <FormField
                    control={tutorForm.control}
                    name="areasExp"
                    render={({ field }) => (
                      <FormItem>
                          <div className="flex flex-row justify-between"> 
                              <FormLabel>Areas (or subjects) of expertise</FormLabel>
                              <FormMessage />
                          </div>
                          <FormControl>
                          <Textarea
                              placeholder="Areas or subjects you would like to teach"
                              {...field}
                              data-test-id="areasExp"
                          />
                          </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={tutorForm.control}
                    name="tutorExp"
                    render={({ field }) => (
                      <FormItem>
                          <div className="flex flex-row justify-between"> 
                              <FormLabel>Tutoring experience</FormLabel>
                              <FormMessage />
                          </div>
                          <FormControl>
                          <Textarea
                              placeholder="Tutoring experience"
                              {...field}
                              data-test-id="tutorExp"
                          />
                          </FormControl>
                    </FormItem>
                    )}
                />
              </div>
                <FormField
                  control={tutorForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row justify-between"> 
                        <FormLabel>Status</FormLabel>
                        <FormMessage />
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={
                        info ? info.status.toString() : undefined
                      }>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Active</SelectItem>
                          <SelectItem value="1">Inactive</SelectItem>
                        </SelectContent>
                      </Select> 
                      <FormDescription>If Active, your profile will be public.</FormDescription>                
                    </FormItem>
                    )}
                />
                {info ? 
                <Button type="submit" data-testid="update">Save</Button>
                : 
                <Button type="submit" date-testid="create">Create tutor account</Button>}
            </form>
        </Form>
        </CardContent>
        </Card>
    </div>
}

export default TutorForm
