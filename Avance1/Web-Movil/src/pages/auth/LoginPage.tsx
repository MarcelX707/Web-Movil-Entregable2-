// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonContent, IonButton, IonIcon,
  IonText, IonLoading, IonFooter, IonToolbar,
} from '@ionic/react';
import { logoGoogle, keyOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Por favor completa todos los campos.'); return; }
    setLoading(true);
    setError('');
    try {
      await AuthService.login(email, password);
      setLoading(false);
      history.push('/dashboard');
    } catch (err: any) {
      setLoading(false);
      const msg = err.response?.data?.error || 'Error al iniciar sesión. Por favor verifica tus credenciales.';
      setError(msg);
    }
  };

  const handleGoogle = () => {
    localStorage.setItem('user', JSON.stringify({ id: '2', nombre: 'Usuario', apellido: 'Google', email: 'user@gmail.com', role: 'user' }));
    localStorage.setItem('token', 'demo-token-google');
    history.push('/dashboard');
  };

  const handleClaveUnica = () => {
    localStorage.setItem('user', JSON.stringify({ id: '3', nombre: 'Ciudadano', apellido: 'Demo', email: 'ciudadano@demo.cl', role: 'user' }));
    localStorage.setItem('token', 'demo-token-cu');
    history.push('/dashboard');
  };

  /* Estilos para inputs nativos — label siempre visible arriba */
  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#5b6b8a',
    fontWeight: 600,
    marginBottom: '4px',
    letterSpacing: '0.02em',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d0d5e0',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '15px',
    background: '#f8f9fc',
    color: '#1a1a2e',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <IonLoading isOpen={loading} message="Iniciando sesión..." />

        <div className="auth-container">
          <div className="auth-logo">
            <img
              src="/assets/logo-municipalidad.png"
              alt="Municipalidad de Santo Domingo"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <h2>Municipalidad de Santo Domingo</h2>
          </div>

          <div className="auth-card">
            <h3>Autentificación</h3>

            <IonButton expand="block" fill="outline" className="social-btn google-btn" onClick={handleGoogle}>
              <IonIcon slot="start" icon={logoGoogle} />
              Gmail
            </IonButton>

            <IonButton expand="block" fill="outline" className="social-btn claveunica-btn" onClick={handleClaveUnica}>
              <IonIcon slot="start" icon={keyOutline} />
              Clave Única
            </IonButton>

            <div className="divider"><span>o ingresa con tu cuenta</span></div>

            {/* FIX: inputs HTML nativos — el label siempre queda arriba sin importar el autocompletado */}
            <form onSubmit={handleLogin} autoComplete="off">

              <div style={fieldStyle}>
                <label style={labelStyle}>
                  <IonIcon icon={mailOutline} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Correo electrónico
                </label>
                <input
                  style={inputStyle}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  name="login-email"
                  placeholder="correo@ejemplo.cl"
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>
                  <IonIcon icon={lockClosedOutline} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Contraseña
                </label>
                <input
                  style={inputStyle}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  name="login-password"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <IonText color="danger">
                  <p className="auth-error">{error}</p>
                </IonText>
              )}

              <IonButton expand="block" type="submit" className="submit-btn">
                Ingresar
              </IonButton>
            </form>

            <p className="auth-link">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className="footer-content">
            <div className="footer-section">
              <strong>Sitio de interés:</strong>
              <ul>
                <li><a href="https://santodomingo.cl/" target="_blank" rel="noreferrer">Sitio Web de la municipalidad</a></li>
                <li><a href="https://santodomingo.cl/pagos/" target="_blank" rel="noreferrer">Pagos Certificados</a></li>
                <li><a href="https://tramites.santodomingo.cl/" target="_blank" rel="noreferrer">Tramites</a></li>
                <li><a href="http://geoportal-santodomingo.hub.arcgis.com/" target="_blank" rel="noreferrer">Geoportal</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <strong>Contacto:</strong>
              <ul>
                <li>Dirección:</li>
                <li>Llamanos:</li>
                <li>Gmail: contacto@santodomingo.cl</li>
              </ul>
            </div>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
