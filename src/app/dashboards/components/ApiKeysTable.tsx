import { EyeIcon, EyeSlashIcon, ClipboardIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

// Types
export interface ApiKey {
  id: string;
  key_name: string;
  key_type: 'production' | 'development';
  created_at: string;
  limit_monthly: boolean;
  monthly_limit: number | null;
  api_key: string;
}

export interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  loading: boolean;
  visibleKeys: Set<string>;
  onToggleVisibility: (id: string) => void;
  onCopyKey: (key: string) => void;
  onDeleteKey: (id: string) => void;
  onEditKey: (key: ApiKey) => void;
}

export const ApiKeysTable = ({ 
  apiKeys, 
  loading, 
  visibleKeys, 
  onToggleVisibility, 
  onCopyKey, 
  onDeleteKey, 
  onEditKey 
}: ApiKeysTableProps) => {
  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune clé API trouvée. Créez votre première clé pour commencer.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-3 px-4 text-left font-semibold">NOM</th>
            <th className="py-3 px-4 text-left font-semibold">TYPE</th>
            <th className="py-3 px-4 text-left font-semibold">LIMITE MENSUELLE</th>
            <th className="py-3 px-4 text-left font-semibold">LIMITE</th>
            <th className="py-3 px-4 text-left font-semibold">CRÉÉ LE</th>
            <th className="py-3 px-4 text-left font-semibold">CLÉ</th>
            <th className="py-3 px-4 text-left font-semibold">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-3 px-4 font-medium">{key.key_name}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  key.key_type === 'production'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {key.key_type}
                </span>
              </td>
              <td className="py-3 px-4">{key.limit_monthly ? 'Oui' : 'Non'}</td>
              <td className="py-3 px-4">{key.monthly_limit || '-'}</td>
              <td className="py-3 px-4">{new Date(key.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4 font-mono">
                {visibleKeys.has(key.id) ? key.api_key : '••••••••••••••••'}
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button
                    aria-label="Modifier le nom"
                    onClick={() => onEditKey(key)}
                    className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition border border-transparent hover:border-blue-200"
                    type="button"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    aria-label={visibleKeys.has(key.id) ? "Masquer la clé" : "Voir la clé"}
                    onClick={() => onToggleVisibility(key.id)}
                    className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition border border-transparent hover:border-blue-200"
                    type="button"
                  >
                    {visibleKeys.has(key.id) ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    aria-label="Copier la clé"
                    onClick={() => onCopyKey(key.api_key)}
                    className="p-2 rounded-full hover:bg-green-100 text-green-600 transition border border-transparent hover:border-green-200"
                    type="button"
                  >
                    <ClipboardIcon className="w-5 h-5" />
                  </button>
                  <button
                    aria-label="Supprimer la clé"
                    onClick={() => onDeleteKey(key.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition border border-transparent hover:border-red-200"
                    type="button"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 