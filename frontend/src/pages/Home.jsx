import { Link } from "react-router-dom";
import hero from "../assets/hero-bg.png";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="glass text-center">
        <h1>SafeRoute 🛡</h1>
        <p>AI Powered Night Navigation Safety</p>

        <Link to="/login">
          <button className="btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
