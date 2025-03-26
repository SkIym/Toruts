import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  signAsTutor,
  updateAsTutor,
  uploadPicture,
} from "../../reducers/userReducer";
import { TutorInfo } from "../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PATH, PORTRAIT, TEST } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRandomString } from "@/hooks";
import { LoadingButton } from "../ui/loadingButton";

const TutorSchema = z.object({
  educAttainment: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
  venue: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
  price: z.coerce.number(),
  areasExp: z.coerce.string(),
  tutorExp: z.string().or(z.literal("")),
  avail: z.string().or(z.literal("")),
  mode: z.string(),
  status: z.string(),
});

type TutorSchemaType = z.infer<typeof TutorSchema>;

type Props = {
  info?: TutorInfo;
};

const areasOfExpSeparator = " ";

const TutorForm = ({ info }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const tutorForm = useForm<TutorSchemaType>({
    defaultValues: info
      ? {
          educAttainment: info.educAttainment,
          venue: info.venue,
          price: info.price,
          areasExp: info.areasOfExpertise.join(" "),
          tutorExp: info.tutoringExperiences,
          avail: info.availability,
          mode: info.learningMode.toString(),
          status: info.status.toString(),
        }
      : undefined,
    resolver: zodResolver(TutorSchema),
  });

  const [portrait, setPortrait] = useState<File | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [portraitTempUrl, setPortraitUrl] = useState<string>(
    info ? `${info.portraitUrl}?random=${useRandomString()}` : PORTRAIT.default
  );
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPortrait(file);
      setPortraitUrl(URL.createObjectURL(file));
    }
  };

  const [uploadingPicture, setUploadingPicture] = useState(false);
  const handlePictureUpload = async () => {
    setUploadingPicture(true);
    if (portrait) {
      await dispatch(uploadPicture(portrait));
    }
    setUploadingPicture(false);
    return;
  };

  const [submittingForm, setSubmittingForm] = useState(false);
  const handleSubmit: SubmitHandler<TutorSchemaType> = async (formData) => {
    setSubmittingForm(true);
    try {
      if (info && user) {
        await dispatch(
          updateAsTutor(user.userName, {
            educAttainment: formData.educAttainment,
            learningMode: parseInt(formData.mode),
            venue: formData.venue,
            price: formData.price,
            areasOfExpertise: formData.areasExp
              .toLowerCase()
              .split(areasOfExpSeparator),
            tutoringExperiences: formData.tutorExp,
            availability: formData.avail,
            status: parseInt(formData.status),
          })
        );
      }
      // create
      else if (user) {
        console.log("WDA");
        await dispatch(
          signAsTutor(user.userName, {
            educAttainment: formData.educAttainment,
            learningMode: parseInt(formData.mode),
            venue: formData.venue,
            price: formData.price,
            areasOfExpertise: formData.areasExp
              .toLowerCase()
              .split(areasOfExpSeparator),
            tutoringExperiences: formData.tutorExp,
            availability: formData.avail,
            status: parseInt(formData.status),
          })
        );
        await handlePictureUpload();
      }
      navigate(`${PATH.PROFILE.default}`);
    } catch {
      console.log("AWEGAKSHDG");
      return;
    }
    setSubmittingForm(false);
  };

  return (
    <div data-testid={TEST.form("tutor")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {info ? "Role information" : "Signing up as a tutor"}
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="items-center flex flex-row justify-start gap-5 border-2 p-5 rounded-2xl">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={portraitTempUrl} />
              <AvatarFallback>AVTR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1>Profile Picture (optional)</h1>
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="picture"
                  type="file"
                  data-testid={TEST.input('picture')}
                  onChange={handleFileInputChange}
                  className="w-full"
                />
              </div>
            </div>
            {info ? (
              <LoadingButton
                disabled={!portrait}
                type="button"
                loading={uploadingPicture}
                onClick={handlePictureUpload}
                data-testid={TEST.button("upload-portrait")}
              >
                {uploadingPicture ? "Uploading picture" : "Upload picture"}
              </LoadingButton>
            ) : null}
          </div>
          <Form {...tutorForm}>
            <form
              onSubmit={tutorForm.handleSubmit(handleSubmit)}
              id="tutor-form"
              className="space-y-8"
            >
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
                          data-testid={TEST.input("educ-attainment")}
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
                          data-testid={TEST.input("price")}
                          type="number"
                          defaultValue={
                            info ? info.price.toString() : undefined
                          }
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        info ? info.learningMode.toString() : undefined
                      }
                      data-testid={TEST.select("mode")}
                    >
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
                          data-testid={TEST.input("venue")}
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
                          data-testid={TEST.input("availability")}
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
                      <FormDescription>
                        Separate terms by spaces, e.g.{" "}
                        <i>`programming cs11 data competititve`</i>{" "}
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Areas or subjects you would like to teach"
                          {...field}
                          data-testid={TEST.input("areas")}
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
                          data-testid={TEST.input("experience")}
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
                    <FormDescription>
                      If Active, your profile will be public.
                    </FormDescription>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={info ? info.status.toString() : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent data-testid={TEST.select("status")}>
                        <SelectItem value="0">Active</SelectItem>
                        <SelectItem value="1">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4 justify-end">
                {info ? (
                  <LoadingButton
                    loading={submittingForm}
                    disabled={!tutorForm.formState.isDirty}
                    type="submit"
                    data-testid={TEST.button("update")}
                  >
                    {submittingForm
                      ? "Saving role information"
                      : "Save role information"}
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    type="submit"
                    loading={submittingForm}
                    date-testid={TEST.button("create")}
                  >
                    {submittingForm
                      ? "Creating tutor account"
                      : "Create tutor account"}
                  </LoadingButton>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorForm;
