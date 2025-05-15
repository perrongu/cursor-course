"use client";

import { useSession } from 'next-auth/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  return <>{children}</>;
} 