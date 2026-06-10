import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses IntersectionObserver to detect when elements enter the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1). Default 0.1
 * @param {string} options.rootMargin - Observer root margin. Default "0px 0px -50px 0px"
 * @param {boolean} options.once - Only trigger once. Default true
 * @returns {{ ref: React.Ref, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * Hook that counts up a number when triggered.
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 * @param {boolean} start - Whether to start counting
 * @returns {string} The current displayed value
 */
export function useCountUp(end, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    // Handle non-numeric values
    const numericEnd = parseFloat(end);
    if (isNaN(numericEnd)) {
      setCount(end);
      return;
    }

    const isDecimal = numericEnd % 1 !== 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericEnd;

      setCount(isDecimal ? current.toFixed(1) : Math.floor(current));

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };

    countRef.current = requestAnimationFrame(animate);
    return () => {
      if (countRef.current) cancelAnimationFrame(countRef.current);
    };
  }, [end, duration, start]);

  return count;
}

/**
 * Hook for 3D tilt effect on hover.
 * Returns event handlers and a style object to apply to a card.
 */
export function useTilt(maxTilt = 6) {
  const [style, setStyle] = useState({});
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  }, []);

  return { ref, style, handleMouseMove, handleMouseLeave };
}
