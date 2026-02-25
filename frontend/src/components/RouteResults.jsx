export default function RouteResults({ data }) {
    if (!data) return null;
  
    const { start, end, routes } = data;
  
    const safest = routes.find((r) => r.risk === "Low");
  
    const openGoogleMaps = () => {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${end}`;
      window.open(url, "_blank");
    };
  
    return (
      <div className="results-container">
        <h2>Route Safety Analysis</h2>
  
        {routes.map((route) => (
          <div
            key={route.id}
            className={`route-card ${
              route.risk === "Low" ? "safest" : ""
            }`}
          >
            <h3>{route.name}</h3>
  
            <p>
              Risk Level: <strong>{route.risk}</strong>
            </p>
  
            <ul>
              {route.reasons.map((r, i) => (
                <li key={i}>⚠ {r}</li>
              ))}
            </ul>
  
            {route.risk === "Low" && (
              <button onClick={openGoogleMaps}>
                Open Safest Route in Google Maps
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
  