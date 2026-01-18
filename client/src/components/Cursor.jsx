import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { CustomCursor } from '../context/CursorContext';

const Cursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [cursor] = useContext(CustomCursor); // Get global cursor state

  useEffect(() => {
    const container = cursorRef.current;
    
    // Initial setup
    gsap.set(container, { xPercent: -50, yPercent: -50 });

    // Optimized quickTo functions
    const xTo = gsap.quickTo(container, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(container, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Update cursor scale based on context state (e.g., hovering a link)
  useEffect(() => {
    if (cursor.active) {
      gsap.to(ringRef.current, { scale: 1.5, duration: 0.3 });
    } else {
      gsap.to(ringRef.current, { scale: 1, duration: 0.3 });
    }
  }, [cursor.active]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9999]"
    >
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className="w-10 h-10 border-2 border-[#60a5fa] rounded-full flex items-center justify-center transition-colors duration-300"
      >
        {/* Inner Dot */}
        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
      </div>
    </div>
  );
};

export default Cursor;