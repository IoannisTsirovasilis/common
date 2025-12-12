import { useEffect } from "react";

export function useClickOutside(props: UseClickOutsideProps) {
  const { isOpen, setIsOpen, ref, parentRef } = props;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isParentRef(parentRef, event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, setIsOpen, ref, parentRef]);
}

function isParentRef(
  parentRef: React.RefObject<HTMLDivElement | null>,
  target: EventTarget,
) {
  return !parentRef || !parentRef.current?.contains(target as Node);
}

export interface UseClickOutsideProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
}
