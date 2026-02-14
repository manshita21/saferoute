import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    login({ name: "User", email });
    navigate("/dashboard");
  };

  return (
    <div style={{display:"flex",justifyContent:"center",height:"100vh",alignItems:"center"}}>
      <div className="glass" style={{width:"320px"}}>
        <h2 style={{marginBottom:"20px", textAlign:"center"}}>Login</h2>

        {error && <p style={{color:"var(--danger)", marginBottom:"10px"}}>{error}</p>}

        <label>Email</label>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn-primary" style={{width:"100%",marginTop:"10px"}} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
