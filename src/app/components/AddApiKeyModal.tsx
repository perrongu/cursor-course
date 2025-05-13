import { useState, useRef, useEffect } from "react";

interface AddApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { keyName: string; keyType: 'production' | 'development'; limitMonthly: boolean; monthlyLimit: number | null }) => void;
}

export const AddApiKeyModal = ({ isOpen, onClose, onCreate }: AddApiKeyModalProps) => {
  const [keyName, setKeyName] = useState("");
  const [keyType, setKeyType] = useState<'production' | 'development'>("development");
  const [limitMonthly, setLimitMonthly] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleCreate = () => {
    if (!keyName.trim()) return;
    onCreate({ keyName, keyType, limitMonthly, monthlyLimit: limitMonthly ? monthlyLimit : null });
    setKeyName("");
    setKeyType("development");
    setLimitMonthly(false);
    setMonthlyLimit(1000);
    onClose();
  };

  const handleCancel = () => {
    setKeyName("");
    setKeyType("development");
    setLimitMonthly(false);
    setMonthlyLimit(1000);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Créer une nouvelle clé API"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 outline-none"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Créer une nouvelle clé API</h2>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-sm" id="keyNameLabel">Nom de la clé</span>
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-base"
            type="text"
            value={keyName}
            onChange={e => setKeyName(e.target.value)}
            placeholder="Nom de la clé"
            aria-labelledby="keyNameLabel"
            autoFocus
          />
        </label>
        <fieldset className="flex flex-col gap-2" aria-label="Type de clé">
          <legend className="font-medium text-sm mb-1">Type</legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="keyType"
                value="production"
                checked={keyType === "production"}
                onChange={() => setKeyType("production")}
                className="accent-blue-600"
                aria-checked={keyType === "production"}
              />
              <span className="text-sm">Production</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="keyType"
                value="development"
                checked={keyType === "development"}
                onChange={() => setKeyType("development")}
                className="accent-blue-600"
                aria-checked={keyType === "development"}
              />
              <span className="text-sm">Développement</span>
            </label>
          </div>
        </fieldset>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={limitMonthly}
            onChange={() => setLimitMonthly(v => !v)}
            className="accent-blue-600"
            aria-checked={limitMonthly}
          />
          <span className="text-sm">Limiter l'usage mensuel</span>
        </label>
        <input
          type="number"
          min={1}
          value={monthlyLimit}
          onChange={e => setMonthlyLimit(Number(e.target.value))}
          disabled={!limitMonthly}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Limite mensuelle"
        />
        <div className="flex gap-4 mt-4 justify-end">
          <button
            className="rounded-full px-5 py-2 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition font-medium"
            onClick={handleCancel}
            tabIndex={0}
            aria-label="Annuler"
            type="button"
          >
            Annuler
          </button>
          <button
            className="rounded-full px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCreate}
            disabled={!keyName.trim()}
            tabIndex={0}
            aria-label="Créer la clé API"
            type="button"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}; 