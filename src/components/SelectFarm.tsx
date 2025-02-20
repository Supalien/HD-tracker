import { IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import { getFarms } from "utils";
import { useCurrentFarm } from "utils/Context";
import { Farm } from "utils/schemes";
export function SelectFarm() {
    const { currentFarm, setCurrentFarm } = useCurrentFarm();
  return (
    <IonSelect
      value={currentFarm}
      interface="popover"
      onIonChange={(e) => {
        setCurrentFarm(e.detail.value);
      }}
    >
      {getFarms().map((f: Farm, i: number) => (
        <IonSelectOption value={i} key={i}>
          {f?.name || "no name"}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
}
