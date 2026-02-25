import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Safe Route Analysis",
      img: "/route.jpg",
      path: "/route"
    },
    {
      title: "Live Safety Tracker",
      img: "/tracker.jpg",
      path: "/tracker"
    },
    {
      title: "Profile",
      img: "/profile.jpg",
      path: "/profile"
    }
  ];

  return (
    <div className="dashboard">

      <h1>Smart Route Safety</h1>

      <div className="card-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card" onClick={()=>navigate(f.path)}>
            <img src={f.img} alt="" />
            <h3>{f.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
