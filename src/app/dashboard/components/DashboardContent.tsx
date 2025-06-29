'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from './Header';
import { WelcomeBanner } from './WelcomeBanner';
import { QuickActionsSection } from './QuickActionsSection';
import { DashboardFooter } from './DashboardFooter';

export const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username') || 'Usuario';
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
          onNewProjection={() => router.push('/new-projection')}
          onViewBonds={() => router.push('/my-bonds')}
          onSystemConfig={() => router.push('/settings')}
          onFinancialAnalysis={() => router.push('/analysis')}
          onManageTerms={() => router.push('/grace-periods')}
        />

        <DashboardFooter />
      </main>
    </div>
  );
};
