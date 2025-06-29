'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput } from '../shared/components/FormInput';
import { GenericButton } from '../shared/components/GenericButton';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ForgotPasswordFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (value: string) => {
    setFormData({ email: value });
    if (errors.email) {
      setErrors({});
    }
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Sending reset link to:', formData.email);
      
      // Replace with your actual forgot password API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On successful email send
      setEmailSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      // Handle error - you might want to show an error message
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/sign-in');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-teal-500 mb-2">BonoPlan</h1>
            <h2 className="text-xl font-semibold text-gray-800">Enlace Enviado</h2>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ¡Enlace enviado!
            </h3>
            
            <p className="text-gray-600 mb-6">
              Hemos enviado un enlace de recuperación a <strong>{formData.email}</strong>. 
              Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
            </p>

            <div className="space-y-3">
              <GenericButton
                text="VOLVER AL INICIO DE SESIÓN"
                status="filled"
                color="teal"
                size="md"
                fullWidth
                onClick={handleBackToLogin}
              />
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
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-teal-500 mb-2">BonoPlan</h1>
          <h2 className="text-xl font-semibold text-gray-800">Recuperar Contraseña</h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Description */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <form onSubmit={handleSendResetLink} className="space-y-4">
            <FormInput
              label="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@correo.com"
              required
              error={errors.email}
            />

            <div className="pt-4">
              <GenericButton
                text="ENVIAR ENLACE"
                status="filled"
                color="teal"
                size="md"
                fullWidth
                type="submit"
                loading={loading}
                disabled={loading}
              />
            </div>
          </form>
          
          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <button
                onClick={handleBackToLogin}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Volver a Iniciar Sesión
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
}