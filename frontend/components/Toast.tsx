'use client';

import { useUI } from '@/lib/store';
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export function Toast() {
  const { showToast, toastMessage, hideToast } = useUI();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, hideToast]);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
      <CheckCircle className="w-5 h-5" />
      <span>{toastMessage}</span>
    </div>
  );
}
