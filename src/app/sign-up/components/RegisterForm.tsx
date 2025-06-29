
import React, { useState } from 'react';
import { FormInput } from '../../shared/components/FormInput';
import { GenericButton } from '@/app/shared/components/GenericButton';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: ''
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nombre"
          value={formData.firstName}
          onChange={(value) => handleInputChange('firstName', value)}
          placeholder="Juan"
          required
          error={errors.firstName}
        />
        
        <FormInput
          label="Apellido"
          value={formData.lastName}
          onChange={(value) => handleInputChange('lastName', value)}
          placeholder="Pérez"
          required
          error={errors.lastName}
        />
      </div>

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
        placeholder="Mínimo 8 caracteres"
        required
        error={errors.password}
      />

      <FormInput
        label="Fecha de Nacimiento"
        type="date"
        value={formData.birthDate}
        onChange={(value) => handleInputChange('birthDate', value)}
        required
        error={errors.birthDate}
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