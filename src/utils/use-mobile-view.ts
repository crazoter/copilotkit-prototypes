"use client";

import { useState, useEffect } from "react";

/**
 * Vibe coded, may not be bug free
 * Hook to detect if the current viewport is mobile
 * Uses a breakpoint of 768px (md breakpoint in Tailwind)
 */
export function useMobileView() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial value
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    setIsLoading(false);

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return { isMobile, isLoading };
}
