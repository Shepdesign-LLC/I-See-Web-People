import React, { useEffect } from 'react';
import { Eye, X } from 'lucide-react';

interface FlashlightOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export const FlashlightOverlay: React.FC<FlashlightOverlayProps> = ({
  isActive,
  onClose
}) => {
  useEffect(() => {
    if (!isActive) return;

    const handlePointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--lantern-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--lantern-y', `${e.clientY}px`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      <div className="flashlight-beam animate-in fade-in duration-200" aria-hidden="true" />
      <div className="fixed top-18 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/95 border border-red-900/80 text-red-300 text-xs shadow-2xl backdrop-blur-md">
        <Eye className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        <span className="font-mono text-[11px]">Darkroom Lens Lit &middot; Uncovering Lost Souls</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer"
          title="Turn off"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </>
  );
};
