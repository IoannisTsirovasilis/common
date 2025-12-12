import { Logger } from "@fistware/logger";
import { useState } from "react";

const logger = Logger({
  enabled: true,
  level: "info",
});
export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      logger.error({
        message: "Failed to copy to clipboard",
        error,
      });
    }
  }

  return {
    isCopied,
    copyToClipboard,
  };
}
