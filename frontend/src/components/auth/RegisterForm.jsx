import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

import { registerUser } from "../../api/authApi";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      console.log(response);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-3xl font-bold text-center">
        Register
      </h2>

      <Input
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <PasswordStrengthMeter
        password={formData.password}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Register
      </Button>
    </form>
  );
}