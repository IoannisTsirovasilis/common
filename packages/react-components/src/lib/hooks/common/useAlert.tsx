import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";
import { useSwipe } from "./useSwipe";
import { WarningIcon } from "../../../components/Icons/WarningIcon";
import { ErrorIcon } from "../../../components/Icons/ErrorIcon";
import { SuccessIcon } from "../../../components/Icons/SuccessIcon";

export type AlertType = "warning" | "error" | "success";

export interface UseAlertProps {
  type: AlertType;
  autoDismiss?: boolean;
  dismissTime?: number;
}

export function useAlert(props: UseAlertProps) {
  const { type, autoDismiss, dismissTime = 3000 } = props;
  const [dismissTimeValue] = useState(dismissTime);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { isCopied, copyToClipboard } = useCopyToClipboard();

  function handleClose() {
    setIsAnimating(true);
    // Add a small delay to allow the animation to complete
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  }

  const useSwipeHook = useSwipe({ handleClose });

  // Auto dismiss functionality
  useEffect(() => {
    if (!autoDismiss) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          handleClose();
          return 0;
        }
        return prev - 100 / (dismissTimeValue / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [autoDismiss, dismissTimeValue]);

  // Reset progress when alert becomes visible
  useEffect(() => {
    if (isVisible) {
      return () => setProgress(100);
    }
  }, [isVisible]);

  const styles = getAlertStyles(type);
  const icon = getIcon(type);

  return {
    isVisible,
    isCopied,
    progress,
    isAnimating,
    alertRef,
    copyToClipboard,
    styles,
    icon,
    progressRef,
    handleClose,
    ...useSwipeHook,
  };
}

function getIcon(type: AlertType) {
  switch (type) {
    case "warning":
      return <WarningIcon />;
    case "error":
      return <ErrorIcon />;
    case "success":
      return <SuccessIcon />;
    default:
      return <WarningIcon />;
  }
}

function getAlertStyles(type: AlertType) {
  switch (type) {
    case "warning":
      return {
        container: "bg-warning-500 text-white border-warning-600",
        icon: "text-warning-100",
        progress: "bg-warning-300",
      };
    case "error":
      return {
        container: "bg-danger-500 text-white border-danger-600",
        icon: "text-danger-100",
        progress: "bg-danger-300",
      };
    case "success":
      return {
        container: "bg-success-500 text-white border-success-600",
        icon: "text-success-100",
        progress: "bg-success-300",
      };
    default:
      return {
        container: "bg-secondary-500 text-white border-secondary-600",
        icon: "text-secondary-100",
        progress: "bg-secondary-300",
      };
  }
}
