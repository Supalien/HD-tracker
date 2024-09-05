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
        <div className='charts'>
          <MyBar
            title='All items'
            items={farm?.items}
          />
          <MyPie
            title = 'Barn'
            items={{bolt: farm?.items.bolt, plank: farm?.items.plank, tape: farm?.items.tape}}
          />
          <MyPie
            title = 'Silo'
            items={{nails: farm?.items.nails, screw: farm?.items.screw, panel: farm?.items.panel}}
          />
          <MyPie
            title = 'Land'
            items={{deed: farm?.items.deed, mallet: farm?.items.mallet, marker: farm?.items.marker}}
          />
          <MyPie
            title = 'Mine'
            items={{dynamite: farm?.items.dynamite, tnt: farm?.items.tnt, shovel: farm?.items.shovel, pick: farm?.items.pick}}
          />
          <MyPie
            title = 'Axes and Saws'
            items={{axe: farm?.items.axe, saw: farm?.items.saw}}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StatsTab;
