import { AnimatePresence, motion } from "framer-motion";

export function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sr-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="sr-modal"
            initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="sr-glass p-3 p-md-4">
              <div className="d-flex align-items-start justify-content-between gap-2">
                <div>
                  <div className="fw-semibold fs-5">{title}</div>
                </div>
                <button className="btn sr-btn btn-sm" onClick={onClose} aria-label="Close">
                  <i className="bi bi-x-lg" />
                </button>
              </div>
              <div className="mt-3">{children}</div>
              {footer && <div className="mt-3">{footer}</div>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

