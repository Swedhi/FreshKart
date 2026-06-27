import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../../api/client";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await client.post(
          "/auth/register",
          {
            email,
            password,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {

        console.error(error);

        alert(
          "Registration Failed"
        );

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
        onSubmit={handleRegister}
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
          Register
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
            setPassword(
              e.target.value
            )
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
          Register
        </button>

        <p
          className="
            text-center
            mt-4
          "
        >
          Already have account?

          <Link
            to="/login"
            className="
              text-green-600
              ml-2
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );
}