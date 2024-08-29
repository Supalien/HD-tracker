import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import ItemButton from 'components/ItemButton';
import './TrackerTab.css';
import wheatPic from 'assets/Wheat.png'
import useCurrent from 'utils';
import { useCurrentFarm, useFarm } from 'utils/Context';
import { useEffect } from 'react';

const TrackerTab: React.FC = () => {
  //const params = useSearhParams(); // wont work until ionic decides to support react router v6
  const {farm} = useFarm();
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Farm "{farm.name}"</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='itemsContainer'>
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
      </div>
      </IonContent>
    </IonPage>
  );
};

export default TrackerTab;
