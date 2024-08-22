import { IonContent, IonHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonButton, IonFab, IonFabButton, IonIcon, IonFabList, useIonModal } from '@ionic/react';
import './FarmsTab.css';
import { useCurrentFarm, useFarm } from 'utils/Context';
import { getFarms } from 'utils';
import { Farm } from 'utils/schemes';
import { add } from 'ionicons/icons';
import NewFarmModal from 'components/NewFarm';

const FarmsTab: React.FC = () => {
  const {farm, setFarm} = useFarm();
  const {currentFarm, setCurrentFarm} = useCurrentFarm();
  let farms = getFarms();
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
            farm.fields = newFarm.fields;
            console.log(farm);
            setFarm({...farm}); // order a rerender
          }
          else{
            const farms = getFarms();
            farms.push(newFarm);
            localStorage.setItem('farms', JSON.stringify(farms));
            setFarm(newFarm)
            setCurrentFarm(currentFarm+1);
          }
        }
      },
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSelect label="Current Farm:" placeholder="Select" interface='popover' onIonChange={(e) => {setCurrentFarm(e.detail.value);}}>
          {farms.map((f: Farm, i: number) => <IonSelectOption value={i} key={i}>{f?.name || "no name"}</IonSelectOption>)}
        </IonSelect>
        {/* debug delete later */}
        currentFarm: {currentFarm} <br/>
        farms[currentFarm]: {farms[currentFarm]?.name} <br/>
        farm: {farm.name}
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
