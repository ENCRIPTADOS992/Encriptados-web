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
    const response = await axiosInstance.post<LoginWithTokenResponse>("/loginWithToken", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRegisterToken = async (): Promise<RegisterTokenResponse> => {
  try {
    // Second arg is request body (null = no body), third arg is config
    const response = await axiosInstance.post<RegisterTokenResponse>("/registerToken", null);
    return response.data;
  } catch (error) {
    throw error;
  }
};
