import { useEffect, useState } from "react";

export function useKeyPressed(key: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "key") {
        setKeyPressed(true);
      }
    };

    const keyup = (event: KeyboardEvent) => {
      if (event.key === key) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
    };
  }, [key]);

  return keyPressed;
}
