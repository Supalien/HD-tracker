import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './StatsTab.css';
import { useFarmCtx } from 'utils/Context';

const StatsTab: React.FC = () => {
  const {farm, setFarm} = useFarmCtx();
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
