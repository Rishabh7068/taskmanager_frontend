import React, { use,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({ email: "", otp: "" });
  const emailverify = localStorage.getItem("email");
  const user = localStorage.getItem("taskmanageruser");

   

  console.log(emailverify);
  useEffect(() => {
    if (!emailverify) {
      console.log("emailverify is null");
      navigate("/login");
      return; // prevents continuing to next check
    }
  
    if (user) {
      console.log("user exists, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user, emailverify, navigate]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_SOME_baseURL;
    try {
      const response = await fetch(`${baseURL}/api/auth/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata), // fixed structure
      });

      const data = await response.json();
      if (data.success) {
        const user = {
          name: data.name,
          token: data.authToken,
        };
        localStorage.setItem("taskmanageruser", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-gray-1000">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Email Verification</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="otp"
              placeholder="Enter your OTP"
              className="input input-bordered w-full"
              value={formdata.otp}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
