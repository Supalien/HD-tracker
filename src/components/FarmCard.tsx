import { IonCard, IonList, IonItem, IonLabel } from "@ionic/react";
import { DPH, getDPH } from "utils/dph";
import { Farm } from "utils/schemes";

const FarmCard: React.FC<{ farm: Farm }> = ({ farm }) => {
  const dph: DPH = getDPH(farm.level);
  // calculate sum of all the values of the farm items
  const total_items: number = Object.entries(farm.items).reduce((total, item) => total + (item[1] as number), 0);
  return (
    <IonCard id={farm.name}>
      <IonList>
        <IonItem lines="full">
          <IonLabel>
            <h1>
              <strong>{farm.name}</strong>
            </h1>
          </IonLabel>
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
