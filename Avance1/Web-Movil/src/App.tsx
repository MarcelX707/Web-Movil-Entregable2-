// src/App.tsx
import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Ionic core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* NO importar dark mode de Ionic:
   NO: @ionic/react/css/palettes/dark.system.css
   NO: @ionic/react/css/palettes/dark.class.css   */

/* Theme propio — va DESPUÉS de Ionic para sobreescribir */
import './theme/variables.css';
import './theme/global.css';

import AppRoutes from './routes/AppRoutes';

/* mode: 'md' fuerza Material Design, más consistente en web */
setupIonicReact({ mode: 'md' });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppRoutes />
    </IonReactRouter>
  </IonApp>
);

export default App;
