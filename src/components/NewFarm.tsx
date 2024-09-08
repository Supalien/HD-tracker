import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { MutableRefObject, useRef } from "react";
import NewFarmForm from "./NewFarmForm";
import React from "react";
import { Farm } from "utils/schemes";
import { getFarms } from "utils";

type Data = {
    name?: string;
    level?: number;
}

export default function NewFarmModal({ dismiss }: { dismiss: (data?: Data | null, role?: string) => void }) {
    const ref = useRef({nameRef: null, levelRef: null});

    function handleConfirm() {
        const newFarm: Farm = {
            name: ref.current.nameRef?.["value"] || 'farm1',
            level: parseInt(ref.current.levelRef?.["value"] || '7'),
            fields: 0,
            items: {
                bolt: 0,
                plank: 0,
                tape: 0,
                nails: 0,
                screw: 0,
                panel: 0,
                deed: 0,
                mallet: 0,
                marker: 0,
                dynamite: 0,
                tnt: 0,
                shovel: 0,
                pick: 0,
                axe: 0,
                saw: 0
            }
        };
        if (newFarm.level > 7 && !getFarms().some(f => f.name === newFarm.name)){
            dismiss(newFarm, "confirm")
        } else {
          alert("Farm name must me unique and level must be above 7")
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