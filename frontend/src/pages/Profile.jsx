import { useState } from "react";

export default function Profile(){

  const [profile,setProfile]=useState(
    JSON.parse(localStorage.getItem("profile")) || {}
  );

  const [form,setForm]=useState(profile);

  const saveProfile=()=>{
    localStorage.setItem("profile",JSON.stringify(form));
    setProfile(form);
  }

  return (
    <div className="glass">

      <h2>Profile</h2>

      <input
        placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <input
        placeholder="Phone"
        onChange={(e)=>setForm({...form,phone:e.target.value})}
      />

      <button onClick={saveProfile}>Save Profile</button>

      {profile.name && (
        <div>
          <h3>Saved Info</h3>
          <p>Name: {profile.name}</p>
          <p>Phone: {profile.phone}</p>
        </div>
      )}

    </div>
  );
}
