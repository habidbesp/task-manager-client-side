import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  ConfirmToken,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
} from "@/types/index";

type AuthAPI = {
  formData: UserRegistrationForm;
  token: ConfirmToken["token"];
};

export async function createAccount(authParams: Pick<AuthAPI, "formData">) {
  const { formData } = authParams;
  try {
    const { data } = await api.post<string>("auth/create-account", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(authParams: Pick<AuthAPI, "token">) {
  const { token } = authParams;
  try {
    const { data } = await api.post<string>("auth/confirm-account", { token });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestToken(authParams: RequestConfirmationCodeForm) {
  const { email } = authParams;
  try {
    const { data } = await api.post<string>("auth/request-token", { email });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(authParams: UserLoginForm) {
  const { email, password } = authParams;
  try {
    const { data } = await api.post<string>("auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
