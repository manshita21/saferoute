import { useState } from "react";

export default function SafeRoute() {

  const [start,setStart] = useState("");
  const [dest,setDest] = useState("");
  const [pin1,setPin1] = useState("");
  const [pin2,setPin2] = useState("");

  const checkRoute = () => {

    if(!/^[0-9]{6}$/.test(pin1) || !/^[0-9]{6}$/.test(pin2)){
      alert("Enter valid 6 digit pincode");
      return;
    }

    if(start.length < 3 || dest.length < 3){
      alert("Enter valid place name");
      return;
    }

    alert("Checking Safe Route...");
  }

  return (
    <div className="glass route-box">

      <h2>Safe Route Analysis</h2>

      <input
        placeholder="Start Location"
        className="big-input"
        onChange={(e)=>setStart(e.target.value)}
      />

      <input
        placeholder="Start Pincode"
        className="big-input"
        onChange={(e)=>setPin1(e.target.value)}
      />

      <input
        placeholder="Destination"
        className="big-input"
        onChange={(e)=>setDest(e.target.value)}
      />

      <input
        placeholder="Destination Pincode"
        className="big-input"
        onChange={(e)=>setPin2(e.target.value)}
      />

      <button className="btn-primary" onClick={checkRoute}>
        Check Safety
      </button>

    </div>
  );
}
