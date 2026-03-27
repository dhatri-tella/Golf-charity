'use client';

import { useEffect, useState } from 'react';

const InteractiveCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });

      // Add trail position
      setTrailPositions(prev => {
        const newTrail = [...prev, { x, y, id: trailId++ }];
        return newTrail.slice(-8); // Keep only last 8 positions
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button' ||
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' || target.classList.contains('cursor-hover')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button' ||
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' || target.classList.contains('cursor-hover')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`cursor ${isHovering ? 'cursor-hover' : ''} ${isClicking ? 'cursor-click' : ''}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Cursor trail */}
      {trailPositions.map((pos, index) => (
        <div
          key={pos.id}
          className="cursor-trail"
          style={{
            left: pos.x - 4,
            top: pos.y - 4,
            opacity: (index + 1) / trailPositions.length * 0.6,
            transform: `scale(${(index + 1) / trailPositions.length})`,
          }}
        />
      ))}
    </>
  );
};

export default InteractiveCursor;