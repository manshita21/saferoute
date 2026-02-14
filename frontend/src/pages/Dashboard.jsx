import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EmergencyButton from "../components/EmergencyButton";

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    { title:"Route Analysis", path:"/route" },
    { title:"Safety Tracker", path:"/tracker" },
    { title:"Emergency Contacts", path:"/emergency" },
    { title:"Profile", path:"/profile" }
  ];

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Safety Control Center</h1>

        <div className="card-grid">
          {features.map((f,i)=>(
            <div key={i} className="feature-card" onClick={()=>navigate(f.path)}>
              <h3>{f.title}</h3>
            </div>
          ))}
        </div>

        <EmergencyButton />
      </div>
    </div>
  );
}
