import { IonInput, IonItem } from "@ionic/react";
import React, { useEffect, useRef } from "react";



function NewFarmForm(props: any, ref: any) {
    const nameRef = useRef(null);
    const levelRef = useRef(null);

    useEffect(() => {
        ref.current = {nameRef: nameRef.current, levelRef: levelRef.current}
     }, [nameRef, levelRef]);

    return (
        <IonItem>
            <IonInput ref={nameRef} labelPlacement="stacked" label="Farm Name" placeholder="farm1" />
            <IonInput ref={levelRef} labelPlacement="stacked" label="Farm Level" placeholder="7" type="number" />
      </IonItem>
    )
}

export default React.forwardRef(NewFarmForm);