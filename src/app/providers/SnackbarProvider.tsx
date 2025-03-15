"use client";

import { createContext, useContext, useState } from "react";

interface SnackbarContextType {
  showSnackbar: (msg: string, type?: "success" | "error") => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error">("success");

  const showSnackbar = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const backgroundColor = type === "success" ? "#02AE8C" : "#D43831";

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {message && (
        <div
          style={{ backgroundColor }}
          className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow-lg transition-opacity`}>
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
