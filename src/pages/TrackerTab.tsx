import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import ItemButton from 'components/ItemButton';
import './TrackerTab.css';
import { useCurrentFarm, useFarm } from 'utils/Context';

import {bolt, plank, tape, nails, screw, panel, deed, mallet, marker, dynamite, tnt, shovel, pick, axe, saw} from 'assets'

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
          <ItemButton name="bolt" pic={bolt}></ItemButton>
          <ItemButton name="plank" pic={plank}></ItemButton>
          <ItemButton name="tape" pic={tape}></ItemButton>
          <ItemButton name="nails" pic={nails}></ItemButton>
          <ItemButton name="screw" pic={screw}></ItemButton>
          <ItemButton name="panel" pic={panel}></ItemButton>
          <ItemButton name="deed" pic={deed}></ItemButton>
          <ItemButton name="mallet" pic={mallet}></ItemButton>
          <ItemButton name="marker" pic={marker}></ItemButton>
          <ItemButton name="dynamite" pic={dynamite}></ItemButton>
          <ItemButton name="tnt" pic={tnt}></ItemButton>
          <ItemButton name="shovel" pic={shovel}></ItemButton>
          <ItemButton name="pick" pic={pick}></ItemButton>
          <ItemButton name="axe" pic={axe}></ItemButton>
          <ItemButton name="saw" pic={saw}></ItemButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TrackerTab;
