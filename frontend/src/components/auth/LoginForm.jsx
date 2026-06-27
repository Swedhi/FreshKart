import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

import { loginSchema } from "../../validation/auth/loginSchema";
import { loginUser } from "../../api/authApi";
import useAuthStore from "../../store/authStore";

export default function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(
        response.user,
        response.token
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <h2 className="text-3xl font-bold text-center">
        Login
      </h2>

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
      />

      {errors.email && (
        <p className="text-sm text-red-500">
          {errors.email.message}
        </p>
      )}

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
      />

      {errors.password && (
        <p className="text-sm text-red-500">
          {errors.password.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-green-700 font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}