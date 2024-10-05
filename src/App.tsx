import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {homeOutline, statsChartOutline, albumsOutline} from 'ionicons/icons';
import TrackerTab from 'pages/TrackerTab';
import StatsTab from 'pages/StatsTab';
import FarmsTab from 'pages/FarmsTab';

import FarmProvider, { CurrentCtxProvider } from 'utils/Context'
import { isProd } from 'utils';
import ga4 from 'react-ga4';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
if (isProd())
  // Initialize Google Analytics 4
  ga4.initialize('G-7XRP9E9F1D');
else
  console.log('Google Analytics 4 is not initialized in development mode');

const App: React.FC = () => (
  <IonApp>
    <CurrentCtxProvider>
      <FarmProvider>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/track">
                <TrackerTab />
              </Route>
              <Route exact path="/stats">
                <StatsTab />
              </Route>
              <Route exact path="/farms">
                <FarmsTab />
              </Route>
              <Route exact path="/">
                <Redirect to="/track" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" id="tabs">
              <IonTabButton tab="track" href="/track">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Track</IonLabel>
              </IonTabButton>
              <IonTabButton tab="stats" href="/stats">
                <IonIcon aria-hidden="true" icon={statsChartOutline} />
                <IonLabel>Stats</IonLabel>
              </IonTabButton>
              <IonTabButton tab="farms" href="/farms">
                <IonIcon aria-hidden="true" icon={albumsOutline} />
                <IonLabel>Farms</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </FarmProvider>
    </CurrentCtxProvider>
  </IonApp>
);

export default App;
