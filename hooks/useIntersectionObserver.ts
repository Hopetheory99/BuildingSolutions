import { useState, useRef, useEffect } from 'react';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(([entry]) => {
      // Only set entry if intersecting, and then disconnect
      if (entry.isIntersecting) {
        setEntry(entry);
        observer.current?.disconnect();
      }
    }, options);

    const { current: currentObserver } = observer;

    if (node) {
      currentObserver.observe(node);
    }

    return () => {
      currentObserver.disconnect();
    };
  }, [node, options]);

  return [setNode, entry] as const;
};

export default useIntersectionObserver;
