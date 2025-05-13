"use client";

import { useEffect } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type: NotificationType;
}

const Notification = ({ message, isVisible, onClose, type }: NotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const hoverColor = type === 'error' ? 'hover:bg-red-600' : 'hover:bg-green-600';

  return (
    <div
      className={`fixed inset-x-0 bottom-4 mx-auto w-fit flex items-center gap-2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className={`ml-2 ${hoverColor} rounded-full p-1`}
        aria-label="Fermer la notification"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default Notification; 