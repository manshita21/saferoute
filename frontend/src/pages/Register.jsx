import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const registerUser = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account Created. Please Login.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="glass auth-box">

        <h1>Create Account</h1>

        <input
          placeholder="Enter Email"
          onChange={(e) => setUser({...user,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Create Password"
          onChange={(e) => setUser({...user,password:e.target.value})}
        />

        <button className="btn-primary" onClick={registerUser}>
          Register
        </button>

      </div>
    </div>
  );
}
