import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { motion } from 'framer-motion';
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import App from "./App";
import "./index.css"; 

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Clerk Publishable Key is missing! Check your .env file.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ClerkLoading>
        <div className="text-white text-center mt-10">Loading...</div>
      </ClerkLoading>
      <ClerkLoaded>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  </React.StrictMode>
);
