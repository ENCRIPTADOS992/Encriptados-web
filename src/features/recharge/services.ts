import axiosInstance from "../../../config/axionsInstance";
import { RechargeBody, RechargeResponse } from "./types/RechargeBody";

export const rechargeNumberSim = async (
  number: RechargeBody
): Promise<RechargeResponse> => {
  try {
    const response = await axiosInstance.post("/rechargeNumberSim", number, {
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
