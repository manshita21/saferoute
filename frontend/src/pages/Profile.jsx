import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Profile(){
  const { user, logout } = useAuth();

  return(
    <div className="layout">
      <Sidebar />
      <div className="content">
        <div className="glass">
          <h2>Profile</h2>
          <p>Email: {user?.email}</p>
          <button className="btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
