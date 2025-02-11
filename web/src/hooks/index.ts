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
        console.log(e)
        switch (e.status) {
            case 400:
                if (e.response?.data.errors.Email) toast.error(e.response?.data.errors.Email[0])
                if (e.response?.data.errors.Password) toast.error(e.response?.data.errors.Password[0])
                break;
            case 500:
                toast.error(e.response?.data[0].description)
                break;
            case 401:
                toast.error(e.response?.data)
                break;
            case 404:
                toast.error("404: Page does not exist")
                break;
            default:
                break;
        }
    } else {
        console.error(e);
    }
}

export const useSuccessNotification = (message: string) => {
    toast.success(message)
}
