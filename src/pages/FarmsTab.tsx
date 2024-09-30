import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonModal } from '@ionic/react';
import './FarmsTab.css';
import { useCurrentFarm, useFarm } from 'utils/Context';
import { getFarms, isProd } from 'utils';
import { Farm } from 'utils/schemes';
import { add } from 'ionicons/icons';
import NewFarmModal from 'components/NewFarm';
import ga4 from 'react-ga4';
import FarmCard from 'components/FarmCard';

const FarmsTab: React.FC = () => {
  const {farm, setFarm} = useFarm();
  const {setCurrentFarm} = useCurrentFarm();
  const [present, dismiss] = useIonModal(NewFarmModal, {
    dismiss: (data: any, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev) => {
        if (ev.detail.role === 'confirm'){
          let newFarm: Farm = ev.detail.data;
          if (farm.level === 0) { // meaning that the current farm is the initial, not configured farm. in that case we want to copy the data that the user might have written on this unconfigured farm and to the newly configured farm.
            farm.name = newFarm.name;
            farm.level = newFarm.level;
            // add the new farm's items (from json) to the current, initial, unconfigured farm
            farm.items = {
              ...farm.items,
              ...Object.fromEntries(
                Object.entries(newFarm.items).map(([key, value]) => [
                  key, (farm.items[key] || 0) + (value || 0)
                ])
              )
            };
            setFarm({...farm}); // order a rerender
          }
          else{
            const farms = getFarms();
            const len = farms.push(newFarm);
            localStorage.setItem('farms', JSON.stringify(farms));
            setCurrentFarm(len - 1);
          }
          if (isProd()) {
            // Send an event when new farm is created
            ga4.event({
              category: newFarm.name,
              action: "new_farm",
              value: newFarm.level, // level of farm
            });
          }
          else
            console.log(`new farm ${newFarm.name} created with level ${newFarm.level}`);
        }
      },
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Farms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {getFarms().map((f, i) => <FarmCard farm={f} id={i} key={i}/>)}
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={openModal}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default FarmsTab;
