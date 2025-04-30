import {
  LoginWithTokenBody,
  LoginWithTokenResponse,
} from "./types/loginWithToken";
import axiosInstance from "../../../config/axionsInstance";
import { RegisterTokenResponse } from "./types/registerToken";

export const userAuthLogin = async (
  credentials: LoginWithTokenBody
): Promise<LoginWithTokenResponse> => {
  try {
    const response = await axiosInstance.post("/loginWithToken", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    throw error;
  }
};

export const userRegisterToken = async (): Promise<RegisterTokenResponse> => {
  try {
    const response = await axiosInstance.post("/registerToken", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    throw error;
  }
};
