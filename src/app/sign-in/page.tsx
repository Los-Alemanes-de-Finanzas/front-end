'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FormInput } from '../shared/components/FormInput';
import { GenericButton } from '../shared/components/GenericButton';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Login attempt:', formData);
      
      // Replace with your actual login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful login
      router!.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWelcome = () => {
    router.push('/');
  };

  const handleGoToRegister = () => {
    router.push('/sign-up');
  };

  const handleGoToForgotPassword = () => {
    router.push('/forgot-password');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-teal-500 mb-2">BonoPlan</h1>
          <h2 className="text-xl font-semibold text-gray-800">Iniciar Sesión</h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <FormInput
              label="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder="correo@ejemplo.com"
              required
              error={errors.email}
            />

            <FormInput
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              placeholder="Tu contraseña"
              required
              error={errors.password}
            />

            <div className="pt-4 space-y-3">
              <GenericButton
                text="INICIAR SESIÓN"
                status="filled"
                color="teal"
                size="md"
                fullWidth
                type="submit"
                loading={loading}
                disabled={loading}
              />
              
              <GenericButton
                text="VOLVER"
                status="outlined"
                color="gray"
                size="md"
                fullWidth
                type="button"
                onClick={handleBackToWelcome}
              />
            </div>
          </form>
          
          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={handleGoToRegister}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Olvidaste tu contraseña?{' '}
              <button
                onClick={handleGoToForgotPassword}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Click aquí
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