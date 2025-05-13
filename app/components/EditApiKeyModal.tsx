"use client";

import { useState, useRef, useEffect } from "react";

interface EditApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (keyId: string, newName: string) => void;
  currentName: string;
  keyId: string;
}

export const EditApiKeyModal = ({ isOpen, onClose, onUpdate, currentName, keyId }: EditApiKeyModalProps) => {
  const [keyName, setKeyName] = useState(currentName);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setKeyName(currentName);
  }, [currentName]);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    if (!keyName.trim()) return;
    onUpdate(keyId, keyName.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Modifier le nom de la clé API"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 outline-none"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Modifier le nom de la clé API</h2>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-sm" id="keyNameLabel">Nouveau nom de la clé</span>
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-base"
            type="text"
            value={keyName}
            onChange={e => setKeyName(e.target.value)}
            placeholder="Nouveau nom de la clé"
            aria-labelledby="keyNameLabel"
            autoFocus
          />
        </label>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            className="rounded-full px-5 py-2 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition font-medium"
            onClick={onClose}
            tabIndex={0}
            aria-label="Annuler"
            type="button"
          >
            Annuler
          </button>
          <button
            className="rounded-full px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpdate}
            disabled={!keyName.trim()}
            tabIndex={0}
            aria-label="Mettre à jour"
            type="button"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
}; 