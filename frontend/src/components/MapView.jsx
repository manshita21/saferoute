import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView(){
  return(
    <div className="glass">
      <MapContainer center={[12.9716,77.5946]} zoom={12} style={{height:"350px"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[12.9716,77.5946]} />
      </MapContainer>
    </div>
  );
}
