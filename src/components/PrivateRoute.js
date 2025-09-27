"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      router.push('/login');
    }
  }, [auth.isLoading, auth.user, router]);

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold">Carregando aplicação...</p>
      </div>
    );
  }

  if (auth.user) {
    return <>{children}</>;
  }

  return null;
}