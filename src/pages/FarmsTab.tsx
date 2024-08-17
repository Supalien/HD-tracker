import { IonContent, IonHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonButton, IonFab, IonFabButton, IonIcon, IonFabList, useIonModal } from '@ionic/react';
import './FarmsTab.css';
import { useCurrentFarm, useFarmCtx } from 'utils/Context';
import { Farm } from 'utils/schemes';
import { useRef, useState } from 'react';
import { add } from 'ionicons/icons';
import NewFarmModal from 'components/NewFarm';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

const FarmsTab: React.FC = () => {
  const {farm, setFarm} = useFarmCtx();
  const {currentFarm, setCurrentFarm} = useCurrentFarm();
  let farms = JSON.parse(localStorage.getItem('farms') || '[]'); // farms array or empty array
  const [present, dismiss] = useIonModal(NewFarmModal, {
    dismiss: (data: any, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev) => {
        if (ev.detail.role === 'confirm')
          setFarm(ev.detail.data)
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
        <IonSelect label="Current Farm:" placeholder="Select" interface='popover' onIonChange={(e) => {setCurrentFarm(e.detail.value); setFarm(farms[e.detail.value])}}>
          {farms.map((f: Farm, i: number) => <IonSelectOption value={i} key={i}>{f?.name || "no name"}</IonSelectOption>)}
        </IonSelect>
        currentFarm: {currentFarm} <br/>
        farms[currentFarm]: {farms[currentFarm]?.name}
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
