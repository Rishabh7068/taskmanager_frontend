import { useNavigate } from "react-router-dom";
import { useState, React ,useEffect} from "react";
import Navbar from "./Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("taskmanageruser");
 
    useEffect(() => {
      if (user) {
        navigate("/dashboard");
      }
    }, [user, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = import.meta.env.VITE_SOME_baseURL;

  const handleSubmit = async (e) => {
    console.log(name, email, password);
    e.preventDefault();
    const response = await fetch(`${baseURL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
        localStorage.setItem("email", "verifyication");
        alert(data.message);
        navigate('/email-verification');
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Signup</legend>

          <label className="label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Name"
          />

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
            Signup
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Signup;
