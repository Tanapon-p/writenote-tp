import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - WriteNote`;
  }, [title]);
  return null;
};
