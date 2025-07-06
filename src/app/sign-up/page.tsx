'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { RegisterForm } from './components/RegisterForm';

interface RegisterFormData {
  username: string;
  password: string;
  confirmedPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      console.log('Registering user:', data);
      
      // Replace with your actual registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On successful registration
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/sign-in');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-teal-500 mb-2">BonoPlan</h1>
          <h2 className="text-xl font-semibold text-gray-800">Crear Nueva Cuenta</h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <RegisterForm onSubmit={handleRegister} loading={loading} />
          
          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={handleBackToLogin}
                className="text-teal-500 hover:text-teal-600 font-medium hover:underline hover:cursor-grab"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 BonoPlan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};