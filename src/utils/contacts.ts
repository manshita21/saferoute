import { readStorage, writeStorage } from "./storage";

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
};

export const CONTACTS_KEY = "saferoute.contacts.v1";

const defaultContacts: EmergencyContact[] = [
  { id: "ambulance-108", name: "Ambulance", phone: "108", createdAt: new Date(0).toISOString() },
  { id: "police-100", name: "Police", phone: "100", createdAt: new Date(0).toISOString() },
];

export function ensureContactsSeeded() {
  const existing = readStorage<EmergencyContact[] | null>(CONTACTS_KEY, null);
  if (!existing) writeStorage(CONTACTS_KEY, defaultContacts);
}

export function readContacts(): EmergencyContact[] {
  ensureContactsSeeded();
  return readStorage<EmergencyContact[]>(CONTACTS_KEY, defaultContacts);
}

export function writeContacts(contacts: EmergencyContact[]) {
  writeStorage(CONTACTS_KEY, contacts);
}

