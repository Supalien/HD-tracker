import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow } from '@ionic/react';

import ItemButton from 'components/ItemButton';
import './TrackerTab.css';
import wheatPic from 'assets/Wheat.png'

const TrackerTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ItemButton name="bolt" pic={wheatPic}></ItemButton>
        <ItemButton name="plank" pic={wheatPic}></ItemButton>
        <ItemButton name="tape" pic={wheatPic}></ItemButton>
        <ItemButton name="nails" pic={wheatPic}></ItemButton>
        <ItemButton name="screw" pic={wheatPic}></ItemButton>
        <ItemButton name="panel" pic={wheatPic}></ItemButton>
        <ItemButton name="deed" pic={wheatPic}></ItemButton>
        <ItemButton name="mallet" pic={wheatPic}></ItemButton>
        <ItemButton name="marker" pic={wheatPic}></ItemButton>
        <ItemButton name="dynamite" pic={wheatPic}></ItemButton>
        <ItemButton name="tnt" pic={wheatPic}></ItemButton>
        <ItemButton name="shovel" pic={wheatPic}></ItemButton>
        <ItemButton name="pick" pic={wheatPic}></ItemButton>
        <ItemButton name="axe" pic={wheatPic}></ItemButton>
        <ItemButton name="saw" pic={wheatPic}></ItemButton>
      </IonContent>
    </IonPage>
  );
};

export default TrackerTab;
