import { useEffect } from "react";

type EventType = MouseEvent | TouchEvent;

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: EventType) => void,
  additionalRefs: React.RefObject<HTMLElement>[] = [] 
) => {
  useEffect(() => {
    const listener = (event: EventType) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        additionalRefs.some(
          (additionalRef) =>
            additionalRef.current &&
            additionalRef.current.contains(event.target as Node)
        )
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, additionalRefs]);
};

export default useOnClickOutside;
