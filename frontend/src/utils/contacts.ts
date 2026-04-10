// frontend/src/utils/contacts.ts

const BASE_URL = "https://saferoute-tkxm.onrender.com/api";

export type EmergencyContact = {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
};

// 🔐 Get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// ✅ GET CONTACTS (from MongoDB)
export async function fetchContacts(): Promise<EmergencyContact[]> {
  const res = await fetch(`${BASE_URL}/emergency`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return res.json();
}

// ✅ ADD CONTACT (store in MongoDB)
export async function addContact(data: {
  name: string;
  phone: string;
}): Promise<EmergencyContact> {
  const res = await fetch(`${BASE_URL}/emergency`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to add contact");
  }

  return res.json();
}

// ✅ DELETE CONTACT
export async function deleteContact(id: string) {
  const res = await fetch(`${BASE_URL}/emergency/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete contact");
  }

  return res.json();
}