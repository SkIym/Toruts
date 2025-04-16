import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { signAsStudent, updateStudent } from "../app/redux/userReducer";
import { StudentInfo } from "../types/types";
import { useNavigate } from "react-router-dom";
import { PATH, TEST } from "@/constants/constants";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { LoadingButton } from "../components/ui/loadingButton";

const StudentSchema = z.object({
  areasImp: z.string(),
  degree: z.string().optional(),
  displayConsent: z.boolean(),
});

type StudentSchemaType = z.infer<typeof StudentSchema>;

type Props = {
  info?: StudentInfo;
};

const areasImpSeparator = " ";

const StudentForm = ({ info }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log(info);
  const studentForm = useForm<StudentSchemaType>({
    defaultValues: info
      ? {
          areasImp: info.areasOfImprovement.join(" "),
          degree: info.degreeProgram || undefined,
          displayConsent: info.displayConsent,
        }
      : undefined,
    resolver: zodResolver(StudentSchema),
  });

  const [submittingForm, setSubmittingForm] = useState(false);
  const handleSubmit: SubmitHandler<StudentSchemaType> = async (formData) => {
    setSubmittingForm(true);
    try {
      if (info && user) {
        await dispatch(
          updateStudent(user.userName, {
            areasOfImprovement: formData.areasImp
              .toLowerCase()
              .split(areasImpSeparator),
            degreeProgram: formData.degree,
            displayConsent: formData.displayConsent,
          })
        );
      }
      // create
      else if (user) {
        await dispatch(
          signAsStudent(user.userName, {
            areasOfImprovement: formData.areasImp
              .toLowerCase()
              .split(areasImpSeparator),
            degreeProgram: formData.degree,
            displayConsent: formData.displayConsent,
          })
        );
      }
      navigate(`${PATH.PROFILE.default}`);
    } catch {
      return;
    }
    setSubmittingForm(false);
  };

  return (
    <div data-testid={TEST.form("student")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {" "}
            {info ? "Role information" : "Signing up as a student"}
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...studentForm}>
            <form
              onSubmit={studentForm.handleSubmit(handleSubmit)}
              id="student-form"
              className="space-y-8"
            >
              <FormField
                control={studentForm.control}
                name="areasImp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject areas you would like to improve in
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        placeholder="Areas of Improvement"
                        {...field}
                        data-testid={TEST.input("areas")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={studentForm.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <FormLabel>Degree Program (optional)</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Degree Program"
                        {...field}
                        data-testid={TEST.input("degree")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={studentForm.control}
                name="displayConsent"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid={TEST.checkbox("consent")}
                        />
                      </FormControl>
                      <FormLabel>
                        Allow other users to view my profile
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4 justify-end">
                {info ? (
                  <LoadingButton
                    loading={submittingForm}
                    disabled={!studentForm.formState.isDirty}
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
                    data-testid={TEST.button("create")}
                  >
                    {submittingForm
                      ? "Creating student account"
                      : "Create student account"}
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

export default StudentForm;
