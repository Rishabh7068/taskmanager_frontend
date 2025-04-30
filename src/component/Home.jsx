import {React ,useEffect}from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import taskImage from '../assets/task-image.svg';

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("taskmanageruser");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* <img
          src={taskImage}
          alt="Task Manager Illustration"
          className="max-w-sm rounded-lg shadow-2xl"
        /> */}
          <div>
            <h1 className="text-5xl font-bold text-primary">
              Stay Organized. Get Things Done.
            </h1>
            <p className="py-6 text-gray-600">
              Simplify your productivity with our intuitive task manager.
              Create, update, and manage your tasks with ease. Whether you're a
              student, professional, or entrepreneur — we help you stay on top
              of what matters.
            </p>
            <div className="flex gap-4">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
