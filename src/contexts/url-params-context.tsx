"use client";

// Vibe coded, may not be bug free
// Bug at the moment: on mobile, chat is closed by default even with ?chat=open

import React, { createContext, useContext, useEffect, useState } from "react";

interface URLParamsContextType {
  chatDefaultOpen: boolean;
  integrationId?: string;
}

const URLParamsContext = createContext<URLParamsContextType>({
  chatDefaultOpen: false,
});

/**
 * Provider component to manage URL parameters
 * Extracts and provides access to URL search parameters
 */
export function URLParamsProvider({ children }: { children: React.ReactNode }) {
  const [chatDefaultOpen, setChatDefaultOpen] = useState(true); // Default to open
  const [integrationId, setIntegrationId] = useState<string | undefined>();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);

    // Check for chat parameter - default is open, unless explicitly set to closed
    const chatParam = searchParams.get("chat");
    if (chatParam === "closed" || chatParam === "false") {
      setChatDefaultOpen(false);
    } else {
      setChatDefaultOpen(true); // Default to true
    }

    // Check for integration ID
    const integrationIdParam = searchParams.get("integrationId");
    if (integrationIdParam) {
      setIntegrationId(integrationIdParam);
    }
  }, []);

  return (
    <URLParamsContext.Provider value={{ chatDefaultOpen, integrationId }}>
      {children}
    </URLParamsContext.Provider>
  );
}

/**
 * Hook to access URL parameters context
 */
export function useURLParams(): URLParamsContextType {
  const context = useContext(URLParamsContext);
  if (!context) {
    throw new Error("useURLParams must be used within a URLParamsProvider");
  }
  return context;
}
