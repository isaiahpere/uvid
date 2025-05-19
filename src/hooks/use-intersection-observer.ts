import { useRef, useEffect, useState } from "react";

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    // targetRef.current is the div we want to observer
    // this will trigger the observer which will help us
    // establish the infinite scroll
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // cleanup observer
    return () => observer.disconnect();
  }, [options]);

  return { targetRef, isIntersecting };
};
