
import { useEffect } from 'react';
import './ItemButton.css';
import { useFarm, useCurrentFarm} from 'utils/Context';
import { Farm, Items } from 'utils/schemes';
import useCurrent from 'utils';

type Props = {
  name: string & keyof Items;
  pic: string;

}

const ItemButton: React.FC<Props> = ({ name, pic }) => {
  const {farm, setFarm} = useFarm();
  return (<>
    <button className="butt" onClick={() => {
      if (farm?.items[name] == null){
        console.log(farm);
        throw new Error("fuck me");}
      farm.items[name] += 1;
      setFarm({...farm});
    }}>
      <img src={pic} alt={name}/>
    </button>
      <>{farm?.items?.[name] || 0}</>
    </>
  );
};

export default ItemButton;
