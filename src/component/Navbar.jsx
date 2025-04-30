import React from "react";
import { Link  } from "react-router-dom";

const Navbar = () => {

 const user = localStorage.getItem("taskmanageruser");

    const handlelogout = () => {
        localStorage.removeItem("taskmanageruser");
        window.location.reload();
    }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Task Manager</Link>
      </div>

      {user ? (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button onClick={handlelogout} className="btn btn-primary">Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login" className="btn btn-outline btn-primary mx-4">Login</Link>
            </li>
            <li>
             <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
