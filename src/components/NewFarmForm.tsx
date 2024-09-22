import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { ValidationError } from "ajv";
import React, { useEffect, useRef, useState } from "react";
import { emptyFarm, isValidFarm } from "utils";
import { Farm, Items } from "utils/schemes";



function NewFarmForm(props: any, ref: any) {
    const [name, setName] = useState<string | null>();
    const [level, setLevel] = useState<number | null>();
    const [items, setItems] = useState<Items>(emptyFarm.items);
    const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            try {
                const data: Farm = JSON.parse(fileReader.result as string);
                const valid = isValidFarm(data);
                console.log("data is a valid farm: ", valid);
                if (valid === true) {
                    setName(data.name);
                    setLevel(data.level);
                    setItems({...items, ...data.items});
                }
            } catch (error) {
                if (error instanceof ValidationError)
                    alert(error.errors.map(e => e.message).join(", "));
                else if (error instanceof Error)
                    alert("Error reading JSON file: " + error.message);
            }
        }
        fileReader.readAsText((event.target.files as FileList)[0]);
    }

    useEffect(() => {
        ref.current = {name: name, level: level, items: items}
     }, [name, level, items]);

    return (
      <>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label="Farm Name"
            placeholder="farm1"
            value={name}
            onIonInput={(e) => setName(e.detail.value)}
          />
          <IonInput
            labelPlacement="stacked"
            label="Farm Level"
            placeholder="7"
            type="number"
            value={level}
            onIonInput={(e) => setLevel(parseInt(e.detail.value as string))}
          />
        </IonItem>
        <IonLabel>
          <br />
          OR
          <br />
        </IonLabel>
        <IonButton onClick={() => inputRef.current?.click()}>
          From JSON
          <input
            type="file"
            accept="application/json"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </IonButton>
      </>
    );
}

export default React.forwardRef(NewFarmForm);





