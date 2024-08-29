import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import './StatsTab.css';
import { useFarm } from 'utils/Context';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import MyPie from 'components/MyPie';
import MyBar from 'components/MyBar';

const StatsTab: React.FC = () => {
  // need to register chartjs so it can work with react
  useIonViewWillEnter(() => {
    ChartJS.register(CategoryScale);
  }, []);

  useIonViewWillLeave(() => {
    ChartJS.unregister(CategoryScale);
  }, []);

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
        <MyBar
          title='All items'
          items={farm?.items || {}}
        />
      </IonContent>
    </IonPage>
  );
};

export default StatsTab;
