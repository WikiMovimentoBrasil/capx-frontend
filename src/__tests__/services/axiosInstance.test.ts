import axiosInstance from "@/services/axiosInstance";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("Axios Instance Interceptors", () => {
  it("should log out the user and redirect to login page on 401 response with 'Invalid token.'", async () => {
    const errorResponse = {
      response: {
        status: 401,
        data: { detail: "Invalid token." },
      },
    };

    try {
      await axiosInstance.interceptors.response.handlers[0].rejected(errorResponse);
    } catch (error) {
      expect(signOut).toHaveBeenCalledWith({ redirect: true, callbackUrl: "/" });
    }
  });

  it("should not log out the user on other errors", async () => {
    const errorResponse = {
      response: {
        status: 500,
        data: { detail: "Server error." },
      },
    };

    try {
      await axiosInstance.interceptors.response.handlers[0].rejected(errorResponse);
    } catch (error) {
      expect(signOut).not.toHaveBeenCalled();
    }
  });
});
