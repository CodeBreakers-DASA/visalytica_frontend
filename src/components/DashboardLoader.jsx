"use client";
import dynamic from 'next/dynamic';

const MeuDashboardFuncional = dynamic(
  () => import('./MeuDashboardFuncional'),
  { 
    ssr: false, 
    loading: () => <p className="p-4 text-center">Carregando dashboard...</p> 
  }
);

export default function DashboardLoader() {
  return <MeuDashboardFuncional />;
}