// src/pages/auth/RegisterPage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonText, IonCheckbox, IonLoading,
  IonBackButton, IonButtons, IonLabel, IonItem,
  IonSelect, IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const REGIONES = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama',
  'Coquimbo', 'Valparaíso', 'Metropolitana de Santiago',
  "O'Higgins", 'Maule', 'Ñuble', 'Biobío', 'La Araucanía',
  'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes',
];

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', rut: '', email: '',
    region: '', comuna: '', password: '', confirmPassword: '',
  });

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validateRut = (rut: string) =>
    /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(rut);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (Object.values(formData).some((v) => !v)) { setError('Todos los campos son obligatorios.'); return; }
    if (!validateRut(formData.rut)) { setError('RUT no válido (formato: 12.345.678-9).'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Las contraseñas no coinciden.'); return; }
    if (formData.password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    if (!termsAccepted) { setError('Debes aceptar los términos y condiciones.'); return; }

    setLoading(true);
    try {
      await AuthService.register(formData);
      setLoading(false);
      history.push('/dashboard');
    } catch (err: any) {
      setLoading(false);
      const msg = err.response?.data?.error || 'Error al registrar usuario. Por favor intenta de nuevo.';
      setError(msg);
    }
  };

  /* Estilo para inputs nativos — evita el bug de solapamiento de Ionic */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 0 4px 0',
    border: 'none',
    borderBottom: '1px solid #ccc',
    outline: 'none',
    fontSize: '16px',
    background: 'transparent',
    color: '#1a1a2e',
    boxSizing: 'border-box',
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px 8px',
    borderBottom: '1px solid #f0f0f0',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#5b6b8a',
    fontWeight: 600,
    marginBottom: '2px',
    letterSpacing: '0.02em',
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Registro de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="register-content">
        <IonLoading isOpen={loading} message="Registrando..." />

        <div className="auth-card register-card">
          <h3>Crear Cuenta</h3>

          {/*
            FIX DEFINITIVO: inputs HTML nativos con label SIEMPRE arriba.
            No dependen de Ionic para el float del label,
            así el autocompletado del browser nunca solapa nada.
          */}
          <form onSubmit={handleRegister} autoComplete="off">

            <div style={fieldStyle}>
              <label style={labelStyle}>Nombre de usuario</label>
              <input
                style={inputStyle}
                type="text"
                value={formData.nombre}
                onChange={(e) => updateField('nombre', e.target.value)}
                autoComplete="new-password"
                name="registro-nombre"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Apellido</label>
              <input
                style={inputStyle}
                type="text"
                value={formData.apellido}
                onChange={(e) => updateField('apellido', e.target.value)}
                autoComplete="new-password"
                name="registro-apellido"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>RUT (ej: 12.345.678-9)</label>
              <input
                style={inputStyle}
                type="text"
                value={formData.rut}
                onChange={(e) => updateField('rut', e.target.value)}
                placeholder="12.345.678-9"
                autoComplete="new-password"
                name="registro-rut"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Correo Electrónico</label>
              <input
                style={inputStyle}
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                autoComplete="new-password"
                name="registro-email"
              />
            </div>

            {/* Región usa IonSelect porque tiene opciones — no tiene bug de solapamiento */}
            <IonItem lines="full">
              <IonLabel position="stacked" style={{ color: '#5b6b8a', fontWeight: 600, fontSize: '12px' }}>
                Región
              </IonLabel>
              <IonSelect
                value={formData.region}
                onIonChange={(e) => updateField('region', e.detail.value)}
                placeholder="Selecciona tu región"
              >
                {REGIONES.map((r) => (
                  <IonSelectOption key={r} value={r}>{r}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <div style={fieldStyle}>
              <label style={labelStyle}>Comuna</label>
              <input
                style={inputStyle}
                type="text"
                value={formData.comuna}
                onChange={(e) => updateField('comuna', e.target.value)}
                autoComplete="new-password"
                name="registro-comuna"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Contraseña</label>
              <input
                style={inputStyle}
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                autoComplete="new-password"
                name="registro-password"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Confirmación de Contraseña</label>
              <input
                style={inputStyle}
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                autoComplete="new-password"
                name="registro-confirm"
              />
            </div>

            <IonItem lines="none" className="terms-item">
              <IonCheckbox
                slot="start"
                checked={termsAccepted}
                onIonChange={(e) => setTermsAccepted(e.detail.checked)}
              />
              <IonLabel className="ion-text-wrap">
                Acepto los{' '}
                <a href="/terms" target="_blank" rel="noreferrer">términos y condiciones</a>
                {' '}de uso de la plataforma.
              </IonLabel>
            </IonItem>

            {error && (
              <IonText color="danger">
                <p className="auth-error">{error}</p>
              </IonText>
            )}

            <IonButton expand="block" type="submit" className="submit-btn">
              Registrarse
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
