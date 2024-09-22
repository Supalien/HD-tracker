import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { MutableRefObject, useRef } from "react";
import NewFarmForm from "./NewFarmForm";
import React from "react";
import { Farm, Items } from "utils/schemes";
import { emptyFarm, getFarms } from "utils";

type Data = {
    name?: string;
    level?: number;
    items?: Items;
}

export default function NewFarmModal({ dismiss }: { dismiss: (data?: Farm | null, role?: string) => void }) {
    const ref = useRef<Farm | null>();

    function handleConfirm() {
        const newFarm = {
            name: ref.current?.name,
            level: ref.current?.level,
            items: ref.current?.items || emptyFarm.items
        };
        if (newFarm.name === undefined || newFarm.level === undefined){
          alert("Must enter name and level.")
          return;
        }
        if (newFarm.level >= 7 && !getFarms().some(f => f.name === newFarm.name)){
          dismiss((newFarm as Farm), "confirm")
        } else {
          alert("Farm name must be unique and level must be at least 7")
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
            <IonTitle>New Farm</IonTitle>
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