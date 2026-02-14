import { useState } from "react";

export default function RouteForm({ onRoutesGenerated }) {
  const [start,setStart]=useState("");
  const [end,setEnd]=useState("");

  const handleSubmit=e=>{
    e.preventDefault();

    if(!start || !end) return alert("Enter locations");

    const routes=[
      {name:"Fastest",score:60},
      {name:"Alternative",score:40},
      {name:"Safest",score:85}
    ];

    const safest = routes.reduce((a,b)=>a.score>b.score?a:b);

    onRoutesGenerated({start,end,routes,safest});
  };

  return(
    <form className="glass" onSubmit={handleSubmit}>
      <input placeholder="Start" value={start} onChange={e=>setStart(e.target.value)} />
      <input placeholder="Destination" value={end} onChange={e=>setEnd(e.target.value)} />
      <button className="btn-primary">Analyze</button>
    </form>
  );
}
