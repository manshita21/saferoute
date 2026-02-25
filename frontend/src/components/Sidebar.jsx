import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar(){
  return(
    <div className="sidebar">
      <h2>SafeRoute</h2>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/route">Routes</NavLink>
      <NavLink to="/tracker">Tracker</NavLink>
      <NavLink to="/emergency">Emergency</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
}
