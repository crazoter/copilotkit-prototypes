"use client";

// Vibe coded, may not be bug free

import { useState, useEffect } from "react";

interface UseMobileChatReturn {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatHeight: number;
  setChatHeight: (height: number) => void;
  isDragging: boolean;
  handleDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Hook to manage mobile chat UI state
 * Handles chat panel opening/closing and drag-to-resize functionality
 */
export function useMobileChat(defaultChatHeight: number): UseMobileChatReturn {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHeight, setChatHeight] = useState(defaultChatHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleDragMove = (e: MouseEvent) => {
      const deltaY = dragStartY - e.clientY;
      const newHeight = Math.max(20, Math.min(90, chatHeight + (deltaY / window.innerHeight) * 100));
      setChatHeight(newHeight);
      setDragStartY(e.clientY);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging, dragStartY, chatHeight]);

  return {
    isChatOpen,
    setIsChatOpen,
    chatHeight,
    setChatHeight,
    isDragging,
    handleDragStart,
  };
}
