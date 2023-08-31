import axios from "axios";
import { API_URL_FROM_WEST } from "./config";

const instance = axios.create({
  baseURL: API_URL_FROM_WEST, // Your API base URL
});

export const api = {
  auth: {
    async checkAuthentication(token: any) {
      try {
        const response = await instance.post(
          "/v1/auth/check",
          {},
          {
            headers: {
              // Set your custom headers here
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response);
        return response.data.ok;
      } catch (error) {
        return false;
      }
    },
    async getUserDetails(token: any) {
      try {
        const response = await instance.get(
          "/v1/profile",
          {
            headers: {
              // Set your custom headers here
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.username;
      } catch (error) {
        return null;
      }
    },
  },
};
