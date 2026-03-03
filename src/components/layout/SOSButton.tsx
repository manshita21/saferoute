import { useMemo, useState } from "react";
import { Modal } from "../ui/Modal";
import { readContacts } from "../../utils/contacts";

export function SOSButton() {
  const [open, setOpen] = useState(false);
  const contacts = useMemo(() => readContacts(), [open]);

  return (
    <>
      <button className="sr-sos" onClick={() => setOpen(true)} aria-label="SOS">
        <i className="bi bi-exclamation-lg" />
        <span className="sr-sos__text">SOS</span>
      </button>

      <Modal
        open={open}
        title="Emergency contacts"
        onClose={() => setOpen(false)}
        footer={
          <div className="sr-text-muted small">
            SafeRoute will never auto-call. You decide when to place a call.
          </div>
        }
      >
        <div className="d-grid gap-2">
          {contacts.map((c) => (
            <a
              key={c.id}
              className="btn sr-btn w-100 d-flex align-items-center justify-content-between"
              href={`tel:${encodeURIComponent(c.phone)}`}
            >
              <span className="d-flex align-items-center gap-2">
                <span
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    border: "1px solid var(--sr-border)",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <i className="bi bi-telephone" />
                </span>
                <span className="text-start">
                  <div className="fw-semibold">{c.name}</div>
                  <div className="sr-text-muted small">{c.phone}</div>
                </span>
              </span>
              <span className="sr-text-muted small">Call</span>
            </a>
          ))}
        </div>
      </Modal>
    </>
  );
}

