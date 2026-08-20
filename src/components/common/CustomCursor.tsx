import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    // Only enable on desktop pointer devices (mouse / trackpad)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over clickable or interactive element
      const interactiveEl = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setHoverText(customText);
        } else {
          setHoverText('');
        }
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  // Hidden on tablets, touch devices, and mobile screens (< 1024px or touchscreen)
  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Ring / Aura with golden trailing physics */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isClicked ? 0.85 : 1,
          opacity: isVisible ? (isHovered ? 0.9 : 0.6) : 0,
          borderColor: isHovered ? '#F3E5AB' : '#D4AF37',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.04)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.5,
        }}
        style={{
          borderWidth: isHovered ? '1.5px' : '1px',
          boxShadow: isHovered ? '0 0 15px rgba(212, 175, 55, 0.4)' : 'none',
        }}
      >
        {hoverText && (
          <span className="text-[8px] font-cinzel font-bold text-[#F3E5AB] tracking-widest uppercase text-center px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Gilded Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#D4AF37] pointer-events-none shadow-[0_0_8px_#D4AF37]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicked ? 0.5 : isHovered ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 700,
          mass: 0.1,
        }}
      />
    </div>
  );
};
