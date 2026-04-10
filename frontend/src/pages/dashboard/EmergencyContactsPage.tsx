import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

import {
  type EmergencyContact,
  fetchContacts,
  addContact,
  deleteContact,
} from "../../utils/contacts";
import { notify } from "../../utils/toast";

export function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts().then(c => {
      setContacts(c);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      notify.error("Failed to load contacts");
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter((c) => {
      const hay = `${c.name} ${c.phone}`.toLowerCase();
      return hay.includes(query);
    });
  }, [contacts, q]);

  return (
    <div className="container py-4 py-md-5">
      <div className="sr-glass p-4 p-md-5 sr-neon-border">
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <div className="fs-5 fw-semibold">Emergency Contacts</div>
            <div className="sr-text-muted mt-1">
              Keep your SOS list updated. Tap to call instantly via <code>tel:</code>.
            </div>
          </div>
          <div className="d-flex gap-2">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search" />
              </span>
              <input
                className="form-control sr-input"
                placeholder="Search contacts"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="sr-divider my-4" />

        <div className="row g-3">
          <div className="col-12 col-lg-5">
            <div className="sr-glass-sm p-3 p-md-4">
              <div className="fw-semibold mb-2">
                <i className="bi bi-plus-circle me-2" />
                Add contact
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const n = name.trim();
                  const p = phone.trim();
                  if (n.length < 2) return notify.error("Enter a contact name.");
                  if (p.length < 2) return notify.error("Enter a phone number.");

                  setBusy(true);
                  try {
                      const newContact = await addContact({ name: n, phone: p, relation: "Family/Friend" });
                      setContacts([newContact, ...contacts]);
                      setName("");
                      setPhone("");
                      notify.success("Contact saved.");
                  } catch (err: any) {
                      notify.error(err.message || "Failed to save contact");
                  } finally {
                      setBusy(false);
                  }
                }}
              >
                <div className="mb-2">
                  <label className="form-label sr-text-muted small">Name</label>
                  <input
                    className="form-control sr-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Dad"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label sr-text-muted small">Phone</label>
                  <input
                    className="form-control sr-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 9999999999"
                    inputMode="tel"
                    required
                  />
                </div>
                <button className="btn sr-btn sr-btn-primary w-100" disabled={busy}>
                  {busy ? "Saving..." : "Add contact"}
                </button>
              </form>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="d-grid gap-2">
              {loading && (
                <div className="sr-glass-sm p-3">
                  <Skeleton height={52} count={3} />
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="sr-glass-sm p-4 text-center">
                  <div
                    className="mx-auto mb-2 d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      border: "1px solid var(--sr-border)",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <i className="bi bi-person-lines-fill fs-4" />
                  </div>
                  <div className="fw-semibold">No contacts found</div>
                  <div className="sr-text-muted small mt-1">
                    Add a contact or clear your search.
                  </div>
                </div>
              )}

              {!loading &&
                filtered.map((c) => (
                  <div key={c._id} className="sr-glass-sm p-3">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-inline-flex align-items-center justify-content-center"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 14,
                            border: "1px solid var(--sr-border)",
                            background: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <i className="bi bi-telephone" />
                        </div>
                        <div>
                          <div className="fw-semibold">{c.name}</div>
                          <div className="sr-text-muted small">{c.phone}</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <a className="btn sr-btn btn-sm" href={`tel:${encodeURIComponent(c.phone)}`}>
                          Call
                        </a>
                        <button
                          className="btn sr-btn btn-sm"
                          onClick={async () => {
                            if (c._id === "ambulance-108" || c._id === "police-100") {
                              notify.info("Default contacts can’t be removed.");
                              return;
                            }
                            try {
                                await deleteContact(c._id);
                                setContacts(contacts.filter((x) => x._id !== c._id));
                                notify.success("Contact deleted.");
                            } catch (e: any) {
                                notify.error("Failed to delete contact.");
                            }
                          }}
                          aria-label={`Delete ${c.name}`}
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

