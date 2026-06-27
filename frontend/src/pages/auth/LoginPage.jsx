import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await client.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(
  response.data.token,
  response.data.userId,
  response.data.email
);

      

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Invalid Credentials");

    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-[400px]
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-lg
            font-semibold
          "
        >
          Login
        </button>

        <p
          className="
            text-center
            mt-4
          "
        >
          Don't have an account?

          <Link
            to="/register"
            className="
              text-green-600
              ml-2
            "
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  );
}