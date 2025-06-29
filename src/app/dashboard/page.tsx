'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { QuickActionsSection } from './components/QuickActionsSection';
import { DashboardFooter } from './components/DashboardFooter';

interface DashboardPageProps {
  userName?: string;
  userEmail?: string;
}

export default function DashboardPage({ 
  userName = "Usuario",
  userEmail = "usuario@email.com" 
}: DashboardPageProps) {
  const router = useRouter();

  // Get user initial for avatar
  const userInitial = userName.charAt(0).toUpperCase();

  // Navigation handlers
  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    console.log('Logging out...');
    router.push('/');
  };

  const handleNewProjection = () => {
    router.push('/new-projection');
  };

  const handleViewBonds = () => {
    router.push('/my-bonds');
  };

  const handleSystemConfig = () => {
    router.push('/settings');
  };

  const handleFinancialAnalysis = () => {
    router.push('/analysis');
  };

  const handleManageTerms = () => {
    router.push('/grace-periods');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        userName={userName}
        userInitial={userInitial}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <WelcomeBanner userName={userName} />

        {/* Quick Actions */}
        <QuickActionsSection
          onNewProjection={handleNewProjection}
          onViewBonds={handleViewBonds}
          onSystemConfig={handleSystemConfig}
          onFinancialAnalysis={handleFinancialAnalysis}
          onManageTerms={handleManageTerms}
        />

        {/* Footer */}
        <DashboardFooter />
      </main>
    </div>
  );
}