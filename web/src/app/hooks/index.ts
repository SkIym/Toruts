import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useField = (type: string, defValue?: string) => {
	const [value, setValue] = useState(defValue ? defValue : "");
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

export const useErrorNotification = () => {
	return (e: unknown) => {
		if (axios.isAxiosError(e)) {
			const response = e.response
			const data = response?.data
			const errors = data?.errors

			switch (e.status) {
			case 400:
				
				// invalid username
				if (data) toast.error(data.message)
	
				// invalid fields
				if (data.errors) for (const err in data.errors) for (const e of data.errors[err]) toast.error(e)
	
				// invalid email
				if (data.errors.Email) for (const err of data.errors.Email) toast.error(err)
	
				// invalid password
				if (data.errors.Password) for (const err of data.errors.Password) toast.error(err)
				break;
			case 500:
				// toast.error(response?.data.message)
				
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
				for (const err of errors) toast.error(err.description)
				break;
			case 401:
				// Unauthorized
				toast.error(response?.data)
				break;
			case 404:
				toast.error('Page does not exist')
				break;
			default:
				toast.error(e.message)
				break;
			}
		}
		else {
			// console.error(e);
			toast.error((e as Error).message)
		}
	}
  
}

export const useSuccessNotification = () => {
	return (message: string) => {
		toast.success(message)
	}

}

export const useRandomString = () => {
	return Math.floor(Math.random() * 100).toString();
}