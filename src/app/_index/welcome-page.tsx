'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { WelcomeHeader } from './components/welcome-header';
import { ActionButtons } from './components/action-buttons';
import { Footer } from './components/footer';

export const WelcomePage: React.FC = () => {

    const router = useRouter();

    const handleLogin = () => router.push('/sign-in');
    
    const handleRegister = () => router.push('/sign-up');
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl">
            <WelcomeHeader />
            <ActionButtons onLogin={handleLogin} onRegister={handleRegister} />
            </div>
        </div>
        
        {/* Footer */}
        <div className="pb-8">
            <Footer />
        </div>
        </div>
    );
};