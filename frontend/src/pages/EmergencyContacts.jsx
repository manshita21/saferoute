import { useState, useEffect } from "react";

export default function EmergencyContacts() {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [contacts,setContacts] = useState([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
    setContacts(saved);
  },[]);

  const handleAdd = () => {

    const phoneRegex = /^[0-9]{10}$/;

    if(!name || !phoneRegex.test(phone)){
      alert("Enter valid name and 10 digit phone number");
      return;
    }

    const newContacts = [...contacts,{name,phone}];
    setContacts(newContacts);

    localStorage.setItem("emergencyContacts",JSON.stringify(newContacts));

    setName("");
    setPhone("");
  };

  return (
    <div style={{padding:"40px"}}>
      <div className="glass">
        <h2>Emergency Contacts</h2>

        <input
          placeholder="Contact Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="10 digit phone number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value.replace(/\D/g,''))}
        />

        <button className="btn-primary" onClick={handleAdd}>
          Add Contact
        </button>

        <ul style={{marginTop:"15px"}}>
          {contacts.map((c,i)=>(
            <li key={i}>{c.name} - {c.phone}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
