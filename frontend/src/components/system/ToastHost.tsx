import { ToastContainer } from "react-toastify";

export function ToastHost() {
  return (
    <ToastContainer
      theme="dark"
      position="bottom-right"
      autoClose={2600}
      newestOnTop
      closeOnClick
      pauseOnHover
      toastStyle={{
        background: "rgba(18, 26, 44, 0.78)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        color: "rgba(243,247,255,0.92)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
      }}
    />
  );
}

