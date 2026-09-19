"use client";

import { useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

      {/* Modal panel */}
      <div className="relative inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-card text-left align-middle shadow-xl transition-all sm:my-8">
        <div className="px-6 py-6 border-b border-border">
          <h3 className="text-lg font-semibold leading-6 text-foreground">{title}</h3>
        </div>
        
        <div className="px-6 py-4">
          {children}
        </div>

        {footer && (
          <div className="bg-muted/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
