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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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
        .string()
        .transform((n) => Number(n) || 0),
    areasExp: z
        .string()
        .nonempty({ message: "required"})
        .transform((s) => s.toLowerCase().split(areasOfExpSeparator)),
    tutorExp: z
        .string()
        .or(z.literal('')),
    avail: z
        .string()
        .or(z.literal('')),
    portrait: z
        .custom<File>((v) => v instanceof File, {
            message: 'required'
        }),
    mode: z
        .string()
        .transform((m) => {
            if (m === '0') return LearningMode.Online
            else if (m === '1') return LearningMode.F2F
            else return LearningMode.Hybrid
        }),
    status: z
    .string()
        .transform((m) => {
            if (m === '0') return Status.Active
            else if (m === '1') return Status.Inactive
            else return Status.Pending
        })
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
            areasExp: info.areasOfExpertise,
            tutorExp: info.tutoringExperiences,
            avail: info.availability,
            portrait: info.portraitUrl,
            mode: info.learningMode,
            status: info.status
        }: undefined,
        resolver: zodResolver(TutorSchema),
    });

    const handleSubmit: SubmitHandler<TutorSchemaType> = async (formData) => {
        try {
            // edit
            if (info && user) {
                await dispatch(updateAsTutor(
                    user.userName,
                    {
                        educAttainment: formData.educAttainment,
                        learningMode: formData.mode,
                        venue: formData.venue,
                        price: formData.price,
                        areasOfExpertise: formData.areasExp,
                        tutoringExperiences: formData.tutorExp,
                        availability: formData.avail,
                        portraitUrl: formData.portrait,
                        status: formData.status
                    }))
            }
            // create
            else if (user) {
                await dispatch(signAsTutor(
                    user.userName,
                    {
                        educAttainment: formData.educAttainment,
                        learningMode: formData.mode,
                        venue: formData.venue,
                        price: formData.price,
                        areasOfExpertise: formData.areasExp,
                        tutoringExperiences: formData.tutorExp,
                        availability: formData.avail,
                        portraitUrl: formData.portrait,
                        status: formData.status
                    }))
            }
            navigate("/");
        } catch {
            return;
        }
    }


    return <div>
        <h1>{info ? "Edit" : "Signing up as a tutor"}</h1>
        <Form {...tutorForm}>
            <form 
                onSubmit={tutorForm.handleSubmit(handleSubmit)}
                id="tutor-form"
                className="space-y-8">
              <div className="grid grid-cols-3 gap-5">
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
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
              </div>
              <div className="grid grid-cols-3 gap-5">
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
              <div className="grid grid-cols-3 gap-5">
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
                            <SelectValue placeholder="Select your status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Active</SelectItem>
                          <SelectItem value="1">Inactive</SelectItem>
                        </SelectContent>
                      </Select>                 
                    </FormItem>
                    )}
                />
                <FormField
                    control={tutorForm.control}
                    name="portrait"
                    render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row justify-between"> 
                            <FormLabel>Profile Picture</FormLabel>
                            <FormMessage />
                        </div>
                        <FormControl>
                        <Input
                            id="picture"
                            type="file"
                            {...field}
                            data-test-id="price"
                        />
                        </FormControl>
                    </FormItem>
                    )}
                />
              </div>
              <Button type="submit">
                {info ? "Save" : "Create tutor account"}
              </Button>
            </form>
        </Form>
    </div>
}

export default TutorForm
