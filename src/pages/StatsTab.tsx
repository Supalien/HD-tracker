import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './StatsTab.css';
import { useFarm } from 'utils/Context';

const StatsTab: React.FC = () => {
  const {farm, setFarm} = useFarm();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <pre>
          {JSON.stringify(farm?.items)}
        </pre>
      </IonContent>
    </IonPage>
  );
};

export default StatsTab;
