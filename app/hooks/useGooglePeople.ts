import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface GoogleSession extends Session {
  accessToken?: string;
}

interface GooglePeopleData {
  contacts: any[];
  loading: boolean;
  error: Error | null;
}

export function useGooglePeople(): GooglePeopleData {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      const googleSession = session as GoogleSession;
      if (!googleSession?.accessToken) return;
      
      try {
        const response = await fetch(
          'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers',
          {
            headers: {
              Authorization: `Bearer ${googleSession.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }

        const data = await response.json();
        setContacts(data.connections || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, [session]);

  return { contacts, loading, error };
} 