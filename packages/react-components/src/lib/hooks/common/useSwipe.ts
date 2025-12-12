import { useRef } from "react";

export interface UseSwipeProps {
  handleClose?: () => void;
}

export function useSwipe(props: UseSwipeProps) {
  const { handleClose } = props;
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  // Touch/swipe functionality
  function handleTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDraggingRef.current) {
      return;
    }
    currentXRef.current = e.touches[0].clientX;

    const deltaX = currentXRef.current - startXRef.current;
    if (deltaX > 50) {
      // Swipe right threshold
      handleClose?.();
    }
  }

  function handleTouchEnd() {
    isDraggingRef.current = false;
  }

  // Mouse drag functionality
  function handleMouseDown(e: React.MouseEvent) {
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    isDraggingRef.current = true;
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDraggingRef.current) {
      return;
    }
    currentXRef.current = e.clientX;

    const deltaX = currentXRef.current - startXRef.current;
    if (deltaX > 50) {
      // Swipe right threshold
      handleClose?.();
    }
  }

  function handleMouseUp() {
    isDraggingRef.current = false;
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
