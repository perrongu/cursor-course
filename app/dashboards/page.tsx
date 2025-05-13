"use client";
import { useState, useEffect } from "react";
import { supabase } from '../../lib/supabase';
import { AddApiKeyModal } from '../components/AddApiKeyModal';
import { EditApiKeyModal } from '../components/EditApiKeyModal';
import { useNotification } from '../components/NotificationContext';
import { PlusIcon } from "@heroicons/react/24/outline";
import { ApiKeysTable } from './components/ApiKeysTable';

// Types
interface ApiKey {
  id: string;
  key_name: string;
  key_type: 'production' | 'development';
  created_at: string;
  limit_monthly: boolean;
  monthly_limit: number | null;
  api_key: string;
}

// Hook personnalisé pour gérer les clés API
const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des clés:', error);
      showNotification('Erreur lors de la récupération des clés.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createKey = async (data: { keyName: string; keyType: 'production' | 'development'; limitMonthly: boolean; monthlyLimit: number | null }) => {
    try {
      const apiKey = `dandi-${data.keyType}-${Math.random().toString(36).substr(2, 24)}`;
      const { error } = await supabase
        .from('api_keys')
        .insert([{
          key_name: data.keyName,
          key_type: data.keyType,
          limit_monthly: data.limitMonthly,
          monthly_limit: data.monthlyLimit,
          api_key: apiKey,
        }]);

      if (error) throw error;
      await fetchApiKeys();
      showNotification('Clé API créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création de la clé:', error);
      showNotification('Erreur lors de la création de la clé.', 'error');
    }
  };

  const deleteKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchApiKeys();
      showNotification('Clé API supprimée avec succès !', 'error');
    } catch (error) {
      console.error('Erreur lors de la suppression de la clé:', error);
      showNotification('Erreur lors de la suppression de la clé.', 'error');
    }
  };

  const updateKeyName = async (keyId: string, newName: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .update({ key_name: newName })
        .eq('id', keyId);
      
      if (error) throw error;
      await fetchApiKeys();
      showNotification('Nom de la clé API mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom de la clé:', error);
      showNotification('Erreur lors de la mise à jour du nom de la clé.', 'error');
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    apiKeys,
    loading,
    createKey,
    deleteKey,
    updateKeyName
  };
};

// Composant pour la section Researcher
const ResearcherSection = () => (
  <div className="bg-gradient-to-r from-rose-100 via-purple-100 to-blue-200 rounded-lg shadow p-6">
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl font-bold text-gray-800">Researcher</h2>
          <span className="px-3 py-1 bg-white bg-opacity-50 rounded-full text-sm text-gray-600">CURRENT PLAN</span>
        </div>
        <p className="text-gray-600">Gérez votre utilisation de l'API</p>
      </div>
      <button className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
        Manage Plan
      </button>
    </div>
    
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">API Usage</h3>
        <span className="text-sm text-gray-600">0 / 1000 Credits</span>
      </div>
      <div className="bg-white bg-opacity-50 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full w-0"></div>
      </div>
    </div>
  </div>
);

// Composant principal
export default function DashboardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const { showNotification } = useNotification();
  const { apiKeys, loading, createKey, deleteKey, updateKeyName } = useApiKeys();

  const handleToggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Clé API copiée !');
  };

  const handleOpenEditModal = (key: ApiKey) => {
    setSelectedKey(key);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <ResearcherSection />

      {/* Section API Keys */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Clés API</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Nouvelle clé
          </button>
        </div>

        <ApiKeysTable
          apiKeys={apiKeys}
          loading={loading}
          visibleKeys={visibleKeys}
          onToggleVisibility={handleToggleKeyVisibility}
          onCopyKey={handleCopyToClipboard}
          onDeleteKey={deleteKey}
          onEditKey={handleOpenEditModal}
        />
      </div>

      <AddApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createKey}
      />
      <EditApiKeyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={updateKeyName}
        currentName={selectedKey?.key_name || ""}
        keyId={selectedKey?.id || ""}
      />
    </div>
  );
}