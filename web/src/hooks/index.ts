import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const useField = (type: string) => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useErrorNotification = (e: unknown) => {
    if (axios.isAxiosError(e)) {
        const response = e.response
        console.log(e)
        switch (e.status) {
            case 400:
                const data = response?.data

                // invalid username
                if (data) toast.error(data.message)

                // invalid email
                if (data.errors.Email)  for(const err of data.errors.Email) toast.error(err)
                
                // invalid password
                if (data.errors.Password) for (const err of data.errors.Password) toast.error(err)
                break;
            case 500:
                // toast.error(response?.data.message)
                const errors = response?.data.errors
                switch (errors.ClassName) {
                    // Handles Network errors: can be changed to other message
                    case 'System.Net.Sockets.SocketException':
                        toast.error(errors.Message)
                        break;
                    case 'System.InvalidOperationException':
                        toast.error(errors.Message)
                        break;
                    default:
                        toast.error(errors.ClassName)
                        toast.error(errors.Message)
                        break;
                }
                for(const err of errors) toast.error(err.description)
                break;
            case 401:
                // Unauthorized
                toast.error(response?.data)
                break;
            case 404:
                toast.error('Page does not exist')
                break;
            default:
                toast.success(e.message)
                break;
        }
    } else {
        console.error(e);
    }
}

export const useSuccessNotification = (message: string) => {
    toast.success(message)
}
