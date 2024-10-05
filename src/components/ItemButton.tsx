
import { createAnimation, useIonToast } from '@ionic/react';
import './ItemButton.css';
import { useFarm} from 'utils/Context';
import { Items } from 'utils/schemes';

type Props = {
  name: string & keyof Items;
  pic: string;

}

const ItemButton: React.FC<Props> = ({ name, pic }) => {
  const [present, dismiss] = useIonToast();
  const presentToast = (mode: "incremented" | "decremented") => {
    // dismiss the current toast and then present a new one (or just show a new one if no toast is shown)
    dismiss().then(() => {
    present({
      message: `Item '${name}' ${mode} to ${farm.items[name]}`, // Item 'item' (incremented / decremented) to x
      duration: 2000,
      position: 'bottom',
      positionAnchor: 'tabs',
      leaveAnimation: () => createAnimation() // step down immediately to make way for the successor toast
    });})
  }
  const {farm, setFarm} = useFarm();
  return (
    <button className="butt" onClick={() => {
      if (farm?.items?.[name] === undefined){
        throw new Error(`Item '${name}' is undefined.`);
      }
      farm.items[name]++;
      setFarm({...farm});
      presentToast("incremented");
    }} onContextMenu={(ev) => {
      ev.preventDefault();
      farm.items[name]--;
      setFarm({...farm});
      presentToast("decremented");
      }}>
      <img src={pic}/>
    </button>
  );
};

export default ItemButton;
