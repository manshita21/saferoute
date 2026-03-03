import { AppBrand } from "../ui/AppBrand";

export function MobileHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="sr-mobile-header">
      <div className="container-fluid px-3 py-2 d-flex align-items-center justify-content-between">
        <button className="btn sr-btn btn-sm" onClick={onMenu} aria-label="Open menu">
          <i className="bi bi-list" />
        </button>
        <AppBrand compact />
        <div style={{ width: 34 }} />
      </div>
    </div>
  );
}

