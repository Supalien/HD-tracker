import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { MutableRefObject, useRef } from "react";
import NewFarmForm from "./NewFarmForm";
import React from "react";
import { Farm } from "utils/schemes";
import { emptyFarm, getFarms } from "utils";

type Data = {
    name?: string;
    level?: number;
}

export default function NewFarmModal({ dismiss }: { dismiss: (data?: Data | null, role?: string) => void }) {
    const ref = useRef<Farm | null>();

    function handleConfirm() {
        const newFarm: Farm = {
            name: ref.current?.name || 'farm1',
            level: ref.current?.level || 7,
            items: ref.current?.items || emptyFarm.items
        };
        if (newFarm.level >= 7 && !getFarms().some(f => f.name === newFarm.name)){
          dismiss(newFarm, "confirm")
        } else {
          alert("Farm name must me unique and level must be at least 7")
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
            <IonTitle>Welcome</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleConfirm} strong={true}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <NewFarmForm ref={ref}/>
        </IonContent>
      </IonPage>
    );
}