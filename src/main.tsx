import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "Inter, sans-serif",
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: {
              style: {
                background: "#F5F0E8",
                color: "#1A3317",
                border: "1px solid #E8E4DC",
              },
              iconTheme: {
                primary: "#2D5A27",
                secondary: "#F5F0E8",
              },
            },
            error: {
              style: {
                background: "#F5F0E8",
                color: "#3A3A3A",
                border: "1px solid #E8E4DC",
              },
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
