import { backendUrl } from "@/constants/env";
import axios from "axios";

export async function createUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const response = await axios.post(`${backendUrl}/api/users/signup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      throw new Error(response.data.message);
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to create user");
    }
  }
}
