'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface PointerState {
  x: number;
  y: number;
  isHovered: boolean;
  isClicked: boolean;
  isVisible: boolean;
  hoverText: string;
}

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const stateRef = useRef<PointerState>({
    x: -100,
    y: -100,
    isHovered: false,
    isClicked: false,
    isVisible: false,
    hoverText: '',
  });
  const [hoverText, setHoverText] = useState('');

  const pointerX = useSpring(-100, { stiffness: 520, damping: 34, mass: 0.35 });
  const pointerY = useSpring(-100, { stiffness: 520, damping: 34, mass: 0.35 });
  const ringScale = useSpring(1, { stiffness: 400, damping: 26, mass: 0.25 });
  const ringSize = useSpring(32, { stiffness: 280, damping: 24, mass: 0.4 });
  const ringOpacity = useSpring(0, { stiffness: 300, damping: 28, mass: 0.3 });
  const dotScale = useSpring(1, { stiffness: 620, damping: 34, mass: 0.12 });
  const dotOpacity = useSpring(0, { stiffness: 340, damping: 30, mass: 0.25 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    if (!mediaQuery.matches) return;
    setEnabled(true);

    let raf = 0;
    let scheduled = false;

    const syncSprings = () => {
      scheduled = false;
      const s = stateRef.current;
      pointerX.set(s.x);
      pointerY.set(s.y);
      ringSize.set(s.isHovered ? 50 : 32);
      ringScale.set(s.isClicked ? 0.85 : 1);
      ringOpacity.set(s.isVisible ? (s.isHovered ? 0.92 : 0.62) : 0);
      dotScale.set(s.isClicked ? 0.5 : s.isHovered ? 0 : 1);
      dotOpacity.set(s.isVisible ? 1 : 0);
    };

    const scheduleSync = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(syncSprings);
    };

    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
      if (!stateRef.current.isVisible) stateRef.current.isVisible = true;
      scheduleSync();
    };
    const onMouseDown = () => {
      stateRef.current.isClicked = true;
      scheduleSync();
    };
    const onMouseUp = () => {
      stateRef.current.isClicked = false;
      scheduleSync();
    };
    const onMouseLeave = () => {
      stateRef.current.isVisible = false;
      scheduleSync();
    };
    const onMouseEnter = () => {
      stateRef.current.isVisible = true;
      scheduleSync();
    };
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (el) {
        stateRef.current.isHovered = true;
        const t = el.getAttribute('data-cursor') || '';
        if (t !== stateRef.current.hoverText) {
          stateRef.current.hoverText = t;
          setHoverText(t);
        }
      } else {
        stateRef.current.isHovered = false;
        if (stateRef.current.hoverText !== '') {
          stateRef.current.hoverText = '';
          setHoverText('');
        }
      }
      scheduleSync();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center border border-[#D4AF37]"
        style={{
          width: ringSize,
          height: ringSize,
          translateX: pointerX,
          translateY: pointerY,
          x: '-50%',
          y: '-50%',
          scale: ringScale,
          opacity: ringOpacity,
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.18)',
          willChange: 'transform, opacity',
        }}
      >
        {hoverText && (
          <span className="text-[8px] font-cinzel font-bold text-[#F3E5AB] tracking-widest uppercase text-center px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#D4AF37] pointer-events-none"
        style={{
          translateX: pointerX,
          translateY: pointerY,
          x: '-50%',
          y: '-50%',
          scale: dotScale,
          opacity: dotOpacity,
          boxShadow: '0 0 8px #D4AF37',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};
