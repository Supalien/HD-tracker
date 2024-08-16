
import { useEffect } from 'react';
import './ItemButton.css';
import { useFarmCtx, useCurrentFarm} from 'utils/Context';
import { Farm, Items } from 'utils/schemes';
// import items from '../items.json'

type Props = {
  name: string & keyof Items;
  pic: string;

}

const ItemButton: React.FC<Props> = ({ name, pic }) => {
  const {farm, setFarm} = useFarmCtx();
  const {currentFarm} = useCurrentFarm();
  useEffect(() => {
  	return () => {
      const farms = localStorage.getItem('farms')
      if (farms === null)
        localStorage.setItem('farms', JSON.stringify([farm]));
      else {
        const farmsArr = JSON.parse(farms);
        if (farmsArr[currentFarm] != null){ 
          farmsArr[currentFarm].items = farm?.items; 
          localStorage.setItem('farms', JSON.stringify(farmsArr));
          localStorage.setItem('currentFarm', currentFarm.toString());
        }
      }
  	};
  }, [farm, currentFarm]);
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


// delete after
// if farms is empty => store a new array which its first and only element is the current farm
// else if farms has other farms in it => get the farm that matches the name of the current farm and modify it.