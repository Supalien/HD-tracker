import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { getFarms } from "utils";
import { Farm, Items } from "utils/schemes";

type Data = {
    name?: string;
    level?: number;
    items?: Items;
}

export default function EditFarmModal({farm, dismiss }: { farm: Farm, dismiss: (data?: Partial<Farm> | null, role?: string) => void }) {
    const [name, setName] = useState<string>(farm.name);
    const [level, setLevel] = useState<number>(farm.level);

    function handleConfirm() {
      
      if (name === undefined || level === undefined){
        alert("Must enter name and level.")
        return;
      }
      // level is between 7 and 999 and name is either unchanged or unique
      if (7 <= level && level <= 999 && (name === farm.name || !getFarms().some(f => f.name.toLowerCase() === name.toLowerCase()))){
          const data: Partial<Farm> = {
              name: name,
              level: level
          }
          dismiss((data), "confirm")
        } else {
          alert("Farm name must be unique and level must be between 7 and 999")
        }
    }

    

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => dismiss(null, "cancel")}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Edit Farm</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleConfirm} strong={true}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Farm Name"
            value={name}
            onIonInput={(e) => setName(e.detail.value as string)}
          />
          <IonInput
            labelPlacement="stacked"
            label="Farm Level"
            type="number"
            value={level}
            onIonInput={(e) => setLevel(parseInt(e.detail.value as string))}
          />
        </IonItem>
        </IonContent>
      </IonPage>
    );
}