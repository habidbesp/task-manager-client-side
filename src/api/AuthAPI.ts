import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  ConfirmToken,
  RequestConfirmationCodeForm,
  ResetPasswordForm,
  SetPassword,
  UserLoginForm,
  UserRegistrationForm,
} from "@/types/index";

type AuthAPI = {
  formData: UserRegistrationForm;
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

export async function confirmAccount(authParams: ConfirmToken) {
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

export async function resetPasswordForm(authParams: ResetPasswordForm) {
  const { email } = authParams;
  try {
    const { data } = await api.post<string>("auth/reset-password", {
      email,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validateToken(authParams: ConfirmToken) {
  const { token } = authParams;
  try {
    const { data } = await api.post<string>("auth/validate-token", {
      token,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function setNewPassword(authParams: SetPassword) {
  const { password, password_confirmation, token } = authParams;

  try {
    const { data } = await api.post<string>(`auth/update-password/${token}`, {
      password,
      password_confirmation,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
