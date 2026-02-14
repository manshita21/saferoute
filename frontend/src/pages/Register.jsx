import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if(!email || !password) return alert("Fill all fields");

    localStorage.setItem("saferouteRegisteredUser",JSON.stringify({email,password}));
    alert("Account Created");
    navigate("/login");
  };

  return (
    <div className="center-screen">
      <div className="glass auth-card">
        <h2>Register</h2>

        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

        <button className="btn-primary" onClick={handleRegister}>Create Account</button>
      </div>
    </div>
  );
}
