import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="d-flex justify-content-between align-items-center p-3">
      <h4>SafeRoute</h4>

      <div>
        <Link to="/" className="me-3 text-light">Home</Link>
        <Link to="/login" className="me-3 text-light">Login</Link>
        <Link to="/register" className="text-light">Register</Link>
      </div>
    </nav>
  );
}
