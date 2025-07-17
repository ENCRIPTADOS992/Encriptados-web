import React, { ReactNode, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
  toggle: ReactNode;
  children: ReactNode;
  dropdownClass?: string;
}
export default function PortalDropdown({
  toggle,
  children,
  dropdownClass = "",
}: PortalDropdownProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Capturamos posición del botón
  const updateCoords = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
  };

  // Click fuera
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Al abrir, actualizamos coords
  useEffect(() => {
    if (open) updateCoords();
  }, [open]);

  return (
    <div ref={btnRef} className="inline-block">
      <div onClick={() => setOpen((v) => !v)}>
        {toggle}
      </div>

      {open &&
        createPortal(
          <div
            className={`absolute z-50 ${dropdownClass}`}
            style={{ top: coords.top, left: coords.left }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
}