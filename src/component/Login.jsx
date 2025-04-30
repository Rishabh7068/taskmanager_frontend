import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("taskmanageruser");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = import.meta.env.VITE_SOME_baseURL;

  const handleSubmit = async (e) => {
    console.log(email, password);
    e.preventDefault();
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      const user = {
        name: data.name,
        token: data.authToken,
      };
      console.log(user);
      localStorage.setItem("taskmanageruser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Email address"
          />

          <label className="label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
          />

          <button onClick={handleSubmit} className="btn btn-neutral mt-4">
            Login
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
