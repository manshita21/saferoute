import { useState } from "react";
import RouteForm from "../components/RouteForm";
import MapView from "../components/MapView";
import SafetyBadge from "../components/SafetyBadge";
import "../styles/routeAnalysis.css";

export default function RouteAnalysis() {

  const [routeData, setRouteData] = useState(null);
  const [recommended, setRecommended] = useState(null);

  const handleRoutesGenerated = (data) => {
    setRouteData(data);

    const safest = data.routes.find(r => r.risk === "Low");
    setRecommended(safest);
  };

  return (
    <div className="route-page">

      <h1>Safe Route Analysis</h1>

      <RouteForm onRoutesGenerated={handleRoutesGenerated} />

      {routeData && (
        <div className="glass" style={{marginTop:"20px"}}>

          <h3>Recommended Route</h3>
          <p><b>{recommended?.name}</b></p>

          <h4>Predicted Risk Factors</h4>
          <ul>
            {recommended?.reasons.map((r,i)=>(
              <li key={i}>⚠ {r}</li>
            ))}
          </ul>

          <SafetyBadge score={recommended?.risk === "Low" ? 90 : 50} />

        </div>
      )}

      {routeData && <MapView routeData={routeData} />}

    </div>
  );
}
