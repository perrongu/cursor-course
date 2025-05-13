"use client";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { AddApiKeyModal } from './components/AddApiKeyModal';
import { EditApiKeyModal } from './components/EditApiKeyModal';
import { useNotification } from './components/NotificationContext';
import { PlusIcon, EyeIcon, EyeSlashIcon, ClipboardIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { AuthButton } from './components/AuthButton';

interface ApiKey {
  id: string;
  key_name: string;
  key_type: 'production' | 'development';
  created_at: string;
  limit_monthly: boolean;
  monthly_limit: number | null;
  api_key: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchApiKeys();
  }, []);

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

  const handleCreateKey = async (data: { keyName: string; keyType: 'production' | 'development'; limitMonthly: boolean; monthlyLimit: number | null }) => {
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

  const handleDeleteKey = async (id: string) => {
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

  const handleUpdateKey = async (keyId: string, newName: string) => {
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

  const toggleKeyVisibility = (id: string) => {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Clé API copiée !');
  };

  const openEditModal = (key: ApiKey) => {
    setSelectedKey(key);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-lg bg-white flex flex-col items-center gap-8">
        <div className="w-full flex justify-end">
          <AuthButton />
        </div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Logo Next.js"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-lg text-gray-700 text-center font-mono space-y-2">
          <li>
            Commencez par modifier <code className="bg-gray-100 px-1 py-0.5 rounded font-semibold">src/app/page.tsx</code>.
          </li>
          <li>
            Sauvegardez et voyez vos changements instantanément.
          </li>
        </ol>
        <div className="flex flex-wrap gap-4 items-center justify-center w-full">
          <Link
            className="rounded-full px-6 py-2 bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition text-base"
            href="/dashboards"
          >
            Gérer les clés API
          </Link>
          <a
            className="rounded-full px-6 py-2 bg-black text-white font-medium shadow hover:bg-gray-900 transition text-base flex items-center gap-2"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Logo Vercel"
              width={20}
              height={20}
            />
            Déployer maintenant
          </a>
          <a
            className="rounded-full px-6 py-2 border border-blue-600 text-blue-600 font-medium shadow hover:bg-blue-50 transition text-base"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lire la documentation
          </a>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center w-full text-sm mt-2">
          <a
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/file.svg" alt="Icône fichier" width={16} height={16} />
            Apprendre
          </a>
          <a
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/window.svg" alt="Icône fenêtre" width={16} height={16} />
            Exemples
          </a>
          <a
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/globe.svg" alt="Icône globe" width={16} height={16} />
            Aller sur nextjs.org →
          </a>
        </div>
      </div>
    </div>
  );
}
