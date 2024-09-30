import { IonCard, IonList, IonItem, IonLabel, IonIcon, IonButton, IonAlert } from "@ionic/react";
import { trash } from "ionicons/icons";
import { useMemo } from "react";
import { getFarms } from "utils";
import { useCurrentFarm } from "utils/Context";
import { DPH, getDPH } from "utils/dph";
import { Farm } from "utils/schemes";


const FarmCard: React.FC<{ farm: Farm, id: number }> = ({ farm, id }) => {
  const dph: DPH = getDPH(farm.level);
  // calculate sum of all the values of the farm items
  const total_items: number = useMemo<number>(() =>
      Object.entries(farm.items).reduce(
        (total, item) => total + (item[1] as number), 0),
    [farm]
  );
  const { currentFarm, setCurrentFarm } = useCurrentFarm();
  function deleteFarm(farm: number): void {
    const farms = getFarms();
    // make sure user doesn't delete all the farms resulting in errors
    if (farms.length <= 1)
      return alert("You can't delete all your farms!")
    farms.splice(farm, 1);
    console.log('farms', farms)
    localStorage.setItem('farms', JSON.stringify(farms));
    if (currentFarm >= id) setCurrentFarm(currentFarm - 1); // if currentFarm is after the deleted farm then set it to the one before
    else setCurrentFarm(currentFarm); // rerender cards
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
          <IonButton fill="clear" color="danger" id={`delete_farm_${id}`}>
            <IonIcon icon={trash}/>
          </IonButton>
          <IonAlert
            trigger={`delete_farm_${id}`}
            header="Are you sure you want to delete this farm?"
            buttons={[
              { text: 'Cancel', role: 'cancel' },
              { text: 'Delete', handler: () => deleteFarm(id) }
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
