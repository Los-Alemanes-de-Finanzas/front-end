
import React, { useState } from 'react';
import { FormInput } from '../../shared/components/FormInput';
import { GenericButton } from '@/app/shared/components/GenericButton';

interface RegisterFormData {
  username: string;
  password: string;
  confirmedPassword: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  loading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    confirmedPassword: ''
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = 'El correo electrónico no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.confirmedPassword.trim()) {
      newErrors.confirmedPassword = 'La contraseña es requerida';
    } else if (formData.confirmedPassword.length < 8) {
      newErrors.confirmedPassword = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Correo Electrónico"
        type="email"
        value={formData.username}
        onChange={(value) => handleInputChange('username', value)}
        placeholder="correo@ejemplo.com"
        required
        error={errors.username}
      />

      <FormInput
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={(value) => handleInputChange('password', value)}
        placeholder="Mínimo 8 caracteres"
        required
        error={errors.password}
      />

      <FormInput
        label="Confirmar Contraseña"
        type="password"
        value={formData.confirmedPassword}
        onChange={(value) => handleInputChange('confirmedPassword', value)}
        placeholder="Ingrese la misma contraseña"
        required
        error={errors.confirmedPassword}
      />

      <div className="pt-4">
        <GenericButton
          text="REGISTRARSE"
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
  );
};