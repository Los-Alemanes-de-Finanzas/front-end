'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from './Header';
import { WelcomeBanner } from './WelcomeBanner';
import { QuickActionsSection } from './QuickActionsSection';
import { DashboardFooter } from './DashboardFooter';

export const DashboardContent = () => {
  const router = useRouter();
  const [userName, setUsername] = useState('');

  useEffect(() => {
      const savedUsername = localStorage.getItem('username');
  
      if (savedUsername) setUsername(savedUsername);
  }, []);

  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    console.log('Logging out...');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={userName} userInitial={userInitial} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeBanner userName={userName} />

        <QuickActionsSection
          onNewProjection={() => router.push(`/dashboard/bonds/new`)}
          onViewBonds={() => router.push(`/dashboard/bonds`)}
          onSystemConfig={() => router.push(`/dashboard/config`)}
          onFinancialAnalysis={() => router.push(`/dashboard/analysis`)}
          onManageTerms={() => router.push(`/dashboard/grace-periods`)}
        />

        <DashboardFooter />
      </main>
    </div>
  );
};