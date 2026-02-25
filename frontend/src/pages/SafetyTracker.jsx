import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import { useEffect, useState } from "react";

export default function SafetyTracker() {

  const [tracking, setTracking] = useState(false);

  useEffect(()=>{
    setTracking(true);
  },[]);

  return (
    <div className="layout">
      <Sidebar/>

      <div className="content">
        <h2>Live Tracking</h2>

        {tracking ? (
          <>
            <p>Tracking your journey in real-time...</p>
            <MapView />
          </>
        ) : (
          <p>Initializing tracker...</p>
        )}

      </div>
    </div>
  );
}
