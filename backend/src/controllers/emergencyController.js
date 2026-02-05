const EmergencyContact = require("../models/EmergencyContact");

// Get all emergency contacts for a user
exports.getContacts = async (req, res) => {
    try {
        const contacts = await EmergencyContact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
};

// Add a new emergency contact
exports.addContact = async (req, res) => {
    try {
        console.log("REQ BODY 👉", req.body);

        const contact = await EmergencyContact.create({
            name: req.body.name,
            relation: req.body.relation,
            phone: req.body.phone
        });

        res.status(201).json(contact);
    } catch (error) {
        console.error("ADD CONTACT ERROR 👉", error);
        res.status(500).json({
            message: "Failed to add contact",
            error: error.message
        });
    }
};

// Delete an emergency contact
exports.deleteContact = async (req, res) => {
    try {
        await EmergencyContact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete contact" });
    }
};
