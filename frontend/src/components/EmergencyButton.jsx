import { motion } from "framer-motion";

export default function EmergencyButton() {

  const handleSOS = () => {

    const contacts = JSON.parse(localStorage.getItem("emergencyContacts"));

    if(!contacts || contacts.length === 0){
      alert("No emergency contacts saved");
      return;
    }

    const firstContact = contacts[0];

    window.location.href = `tel:${firstContact.phone}`;
  };

  return (
    <motion.button
      className="btn-danger"
      onClick={handleSOS}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        fontWeight: "bold"
      }}
    >
      SOS
    </motion.button>
  );
}
