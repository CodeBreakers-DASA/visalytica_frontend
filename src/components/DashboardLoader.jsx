"use client";
import dynamic from 'next/dynamic';

const MeuDashboardFuncional = dynamic(
  () => import('./MeuDashboardFuncional'),
  { 
    ssr: false, 
    loading: () => <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  }
);

export default function DashboardLoader() {
  return <MeuDashboardFuncional />;
}