import { useForm, FieldError } from "react-hook-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../types/types-d";
import { axi } from "../api/axiosInstance";
import axios from "axios";
import { useAuthenticationStore } from "../store/users";

export default function LoginPage() {

 const { user, setUser, setIsAuthenticated } = useAuthenticationStore();

  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [loginError, setLoginError] = useState("");

  const getCsrfToken = async () => {
    try {
      const response = await axi.get("/users/csrf/");
      const cookie = response.headers["set-cookie"]
        ?.find((c) => c.startsWith("csrftoken"))
        ?.split(";")[0];
      return cookie ? cookie.split("=")[1] : "";
    } catch (error) {
      console.error("Error getting CSRF token:", error);
      return "";
    }
  };

  const handleLogin = async (data: User) => {
    try {
      const csrfToken = await getCsrfToken();

      const response = await axi.post("/users/login/", data, {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(data);

      if (response.status === 200) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };

  const getErrorMessage = (error: FieldError | undefined): string => {
    return error?.message ?? "";
  };

  return (
    <div className="min-h-screen bg-[#c1d7ff] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

        {loginError && (
          <p className="text-red-500 mb-4 text-sm">{loginError}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {getErrorMessage(errors.username)}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {getErrorMessage(errors.password)}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
