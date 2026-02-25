import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EmergencyContacts() {

  const [contacts, setContacts] = useState([]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  /* 🔹 Normalize Contacts */
  const normalizeContacts = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((c, index) => {
      if (typeof c === "string") {
        return { name: `Contact ${index + 1}`, phone: c };
      }

      if (c && typeof c === "object") {
        return {
          name: c.name || `Contact ${index + 1}`,
          phone: c.phone || ""
        };
      }

      return null;
    }).filter(Boolean);
  };

  /* 🔹 Load Contacts */
  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
    const normalized = normalizeContacts(saved);

    localStorage.setItem("emergencyContacts", JSON.stringify(normalized));
    setContacts(normalized);

  }, []);

  /* 🔹 Add Contact */
  const addContact = () => {

    if (!name.trim())
      return alert("Enter contact name");

    if (!/^[0-9]{10}$/.test(number))
      return alert("Enter valid 10 digit number");

    // Prevent duplicates
    if (contacts.some(c => c.phone === number))
      return alert("Contact already exists");

    const updated = [...contacts, { name, phone: number }];

    localStorage.setItem("emergencyContacts", JSON.stringify(updated));
    setContacts(updated);

    setName("");
    setNumber("");
  };

  /* 🔹 Delete Contact */
  const deleteContact = (phone) => {

    const updated = contacts.filter(c => c.phone !== phone);

    localStorage.setItem("emergencyContacts", JSON.stringify(updated));
    setContacts(updated);
  };

  /* 🔹 SOS Logic */
  const triggerSOS = () => {

    if (!contacts.length)
      return alert("No emergency contacts saved");

    const primary = contacts[0];

    alert(`🚨 SOS Triggered
Calling ${primary.name} (${primary.phone})
Sending location alert...`);
  };

  return (
    <div style={{ padding: "40px" }}>

      {/* 🔹 SOS BUTTON */}
      <motion.button
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="btn-primary"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          fontSize: "22px",
          display: "block",
          margin: "auto"
        }}
        onClick={triggerSOS}
      >
        SOS
      </motion.button>

      {/* 🔹 CONTACT MANAGER */}
      <div className="glass" style={{ marginTop: "30px" }}>

        <h3>Manage Emergency Contacts</h3>

        <input
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="10 Digit Number"
          value={number}
          maxLength={10}
          onChange={(e) =>
            setNumber(e.target.value.replace(/\D/g, ""))
          }
        />

        <button className="btn-primary" onClick={addContact}>
          Add Contact
        </button>

        {/* 🔹 CONTACT LIST */}
        <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>

          {contacts.length === 0 && (
            <p style={{ opacity: 0.6 }}>No contacts added</p>
          )}

          {contacts.map((c, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                background: "rgba(255,255,255,0.05)",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              <span>
                👤 {c.name} — 📞 {c.phone}
              </span>

              <button
                style={{
                  background: "red",
                  border: "none",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                onClick={() => deleteContact(c.phone)}
              >
                Delete
              </button>

            </li>
          ))}

        </ul>

      </div>
    </div>
  );
}
