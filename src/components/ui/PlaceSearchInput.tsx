import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import { useDebounce } from "../../hooks/useDebounce";
import { nominatimSearch, type NominatimResult } from "../../utils/nominatim";

export function PlaceSearchInput({
  label,
  placeholder,
  value,
  onChange,
  onPick,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onPick: (r: NominatimResult) => void;
}) {
  const debounced = useDebounce(value, 350);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const showDropdown = open && (loading || results.length > 0);

  useEffect(() => {
    const q = debounced.trim();
    if (q.length < 3) {
      setLoading(false);
      setResults([]);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    nominatimSearch(q, { signal: ac.signal, limit: 6 })
      .then((r) => setResults(r))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [debounced]);

  const items = useMemo(() => results.slice(0, 6), [results]);

  return (
    <div className="position-relative">
      <label className="form-label sr-text-muted small">{label}</label>
      <div className="input-group">
        <span className="input-group-text bg-transparent border-0">
          <i className="bi bi-search" />
        </span>
        <input
          className="form-control sr-input"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        />
      </div>

      {showDropdown && (
        <div className="sr-dropdown sr-glass-sm mt-2">
          {loading && <div className="p-3 sr-text-muted small">Searching…</div>}
          {!loading &&
            items.map((r) => (
              <button
                key={r.place_id}
                type="button"
                className={classNames("sr-dropdown__item")}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(r);
                  setOpen(false);
                }}
              >
                <div className="fw-semibold text-truncate">{r.display_name.split(",")[0]}</div>
                <div className="sr-text-muted small text-truncate">{r.display_name}</div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

