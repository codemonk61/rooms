import { useState, useEffect, useRef } from 'react';

const useMediaLoader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mediaRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );
    
    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }
    
    return () => {
      if (mediaRef.current) {
        observer.unobserve(mediaRef.current);
      }
    };
  }, []);
  
  return { mediaRef, isVisible };
};

export default useMediaLoader;