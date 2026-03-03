# SafeRoute – Real-Time Route Safety Assessment (Frontend)

Production-ready React (Vite) frontend for **SafeRoute** with:

- **LocalStorage auth** (register/login/logout + protected dashboard)
- **Real OpenStreetMap tiles** (Leaflet + React Leaflet)
- **Real routing polyline** (Leaflet Routing Machine)
- **Real geocoding** via **Nominatim** (OpenStreetMap)
- **Real live tracking** via browser `navigator.geolocation.watchPosition()`
- **Stationary detection** with staged emergency UI (no auto-calling)
- **Emergency contacts** (preloaded + editable, `tel:` dialing)
- **Trip history + community feedback** (stored locally)
- Premium UI: glassmorphism + neon theme, responsive sidebar, page transitions, toasts, skeletons

## Install

```bash
npm install
```

## Run (dev)

```bash
npm run dev
```

Open the shown local URL (usually `http://localhost:5173`).

## Notes

- **Geolocation** works best on **HTTPS** or `localhost`. Allow location permissions in the browser.
- **Nominatim** is a public service and can rate-limit heavy usage; the UI uses debounced queries to reduce requests.

