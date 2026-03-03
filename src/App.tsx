import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AppRoutes } from "./routes/AppRoutes";
import { ScrollToTop } from "./components/system/ScrollToTop";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <AppRoutes />
      </AnimatePresence>
    </BrowserRouter>
  );
}

