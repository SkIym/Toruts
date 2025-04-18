import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { addUserInfo } from "../app/redux/userReducer";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PATH, TEST } from "@/constants/constants";
import { LoadingButton } from "../components/ui/loadingButton";
import { useState } from "react";

// Define the Zod schema for the form
const ProfileEditFormSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
  lastName: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[A-Za-z\s]+$/, "Please enter only alphabetical characters."),
  phoneNumber: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[0-9]+$/, "Please enter only numeric characters."),
});

type ProfileEditFormSchemaType = z.infer<typeof ProfileEditFormSchema>;

export const ProfileEditForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const primaryInfo = user?.primaryInfo;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Set up the form using react-hook-form and zod for validation.
  const infoForm = useForm<ProfileEditFormSchemaType>({
    resolver: zodResolver(ProfileEditFormSchema),
    defaultValues: {
      firstName: primaryInfo?.firstName || "",
      lastName: primaryInfo?.lastName || "",
      phoneNumber: primaryInfo?.phoneNumber || "",
    },
  });

  const [submittingForm, setSubmittingForm] = useState(false);
  const handleInformation: SubmitHandler<ProfileEditFormSchemaType> = async (
    formData
  ) => {
    setSubmittingForm(true);
    try {
      const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
      if (user == null || loggedInUserJSON == null) {
        throw "not logged in";
      }

      await dispatch(
        addUserInfo(user.userName, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
        })
      );
      navigate(PATH.PROFILE.default);
    } catch (err) {
      console.log(err);
    }

    setSubmittingForm(false);
  };

  return (
    <div data-testid={TEST.form("profile-edit")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Primary information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...infoForm}>
            <form
              onSubmit={infoForm.handleSubmit(handleInformation)}
              id="user-information-form"
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={infoForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row justify-between">
                        <FormLabel>First Name</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          data-testid={TEST.input("first-name")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={infoForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row justify-between">
                        <FormLabel>Last Name</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          data-testid={TEST.input("last-name")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={infoForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Phone Number</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        data-testid={TEST.input("phone-number")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4 justify-end">
                <LoadingButton
                  loading={submittingForm}
                  disabled={!infoForm.formState.isDirty}
                  type="submit"
                  data-testid={TEST.button("update-profile")}
                >
                  {submittingForm
                    ? "Saving primary information"
                    : "Save primary information"}
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
