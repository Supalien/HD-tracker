import { IonCard, IonList, IonItem, IonLabel, IonIcon, IonButton, IonAlert, useIonModal } from "@ionic/react";
import { codeDownload, pencil, trash } from "ionicons/icons";
import { useMemo } from "react";
import { getFarms } from "utils";
import { useCurrentFarm } from "utils/Context";
import { DPH, getDPH } from "utils/dph";
import { Farm } from "utils/schemes";
import EditFarmModal from "./EditFarm";


const FarmCard: React.FC<{ farm: Farm, id: number }> = ({ farm, id }) => {
  const dph: DPH = getDPH(farm.level);
  // calculate sum of all the values of the farm items
  const total_items: number = useMemo<number>(() =>
      Object.entries(farm.items).reduce(
        (total, item) => total + (item[1] as number), 0),
    [farm]
  );
  const { currentFarm, setCurrentFarm } = useCurrentFarm();
  function deleteFarm(): void {
    const farms = getFarms();
    // make sure user doesn't delete all the farms resulting in errors
    if (farms.length <= 1)
      return alert("You can't delete all your farms!")
    farms.splice(id, 1);
    localStorage.setItem('farms', JSON.stringify(farms));
    if (currentFarm >= id) setCurrentFarm(currentFarm - 1); // if currentFarm is after the deleted farm then set it to the one before
    else setCurrentFarm(-currentFarm); // if currentFarm is the same then trigger forced rerender
  }
  function downloadFarm(): void {
    const data = JSON.stringify(farm);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${farm.name}.json`;
    a.click();
    URL.revokeObjectURL(url); // free up memory
  }

  const [present, dismiss] = useIonModal(EditFarmModal, {
    farm: farm,
    dismiss: (data: Farm, role: string) => dismiss(data, role),
  });
  function editFarm(): void {
    present({
      onWillDismiss: (ev) => {
        if (ev.detail.role === 'confirm'){
          const farms = getFarms();
          const newFarm: Farm = {...ev.detail.data, items: farm.items};
          farms[id] = newFarm;
          localStorage.setItem('farms', JSON.stringify(farms));
          setCurrentFarm(-currentFarm);
        }
      },
    });
  }
  return (
    <IonCard id={farm.name}>
      <IonList>
        <IonItem lines="full">
          <IonLabel>
            <h1>
              <strong>{farm.name}</strong>
            </h1>
          </IonLabel>
          <IonButton fill="clear" onClick={() => downloadFarm()}>
            <IonIcon icon={codeDownload}/>
          </IonButton>
          <IonButton fill="clear" onClick={() => editFarm()}>
            <IonIcon icon={pencil}/>
          </IonButton>
          <IonButton fill="clear" color="danger" id={`delete_farm_${id}`}>
            <IonIcon icon={trash}/>
          </IonButton>
          <IonAlert
            trigger={`delete_farm_${id}`}
            header="Are you sure you want to delete this farm?"
            buttons={[
              { text: 'Cancel', role: 'cancel' },
              { text: 'Delete', handler: () => deleteFarm() }
            ]}
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            <strong>Level:</strong> {farm.level}
          </IonLabel>
        </IonItem>
        <IonItem lines="full">
          <IonLabel>
            <strong>Fields:</strong> {dph.fields}
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            <strong>Fields per Drop:</strong> {dph.eventTrigger}
          </IonLabel>
        </IonItem>
        <IonItem lines="full">
          <IonLabel>
            <strong>Drops per Harvest:</strong> {dph.dph}
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            <strong>Total items tracked: </strong> {total_items}
          </IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default FarmCard;
