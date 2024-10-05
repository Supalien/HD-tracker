
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
  const presentToast = (mode: "increment" | "decrement") => {
    // dismiss the current toast and then present a new one (or just show a new one if no toast is shown)
    dismiss().then(() => {
    present({
      message: `Item '${name}' ${mode + 'ed'} to ${farm.items[name]}`, // Item 'item' (incremented / decremented) to x
      duration: 3000,
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
      presentToast("increment");
    }} onContextMenu={(ev) => {
      ev.preventDefault();
      presentToast("decrement");
      }}>
      <img src={pic}/>
    </button>
  );
};

export default ItemButton;
