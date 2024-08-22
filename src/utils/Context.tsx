import { createContext, useState, useContext, useEffect} from "react";
import { Farm, Items } from './schemes';
import { getFarms } from "utils";

type FarmCtx = {
    farm: Farm,
    setFarm: React.Dispatch<React.SetStateAction<Farm>>
}

type CurrentCtx = {
    currentFarm: number,
    setCurrentFarm: React.Dispatch<React.SetStateAction<number>>
}

// farm contex provider hook

export const FarmCtx = createContext<FarmCtx | null>(null);

/**
 * A context provider that provides Farm data and its setter function to its children components.
 * It initializes the Farm data from local storage or with a default empty Farm if no data is found.
 *
 * @param children - The child components that will have access to the farm data and its setter function.
 *
 * @returns farm context provider.
 */
export default function FarmCtxProvider({ children }: any){
    const {currentFarm} = useCurrentFarm();
    const [farm, setFarm] = useState<Farm>( () => {
        const farmsItem = localStorage.getItem('farms');
        return farmsItem? JSON.parse(farmsItem)[currentFarm] : {
            name: 'farm1',
            level: 0,
            fields: 0,
            items: {
                bolt: 0,
                plank: 0,
                tape: 0,
                nails: 0,
                screw: 0,
                panel: 0,
                deed: 0,
                mallet: 0,
                marker: 0,
                dynamite: 0,
                tnt: 0,
                shovel: 0,
                pick: 0,
                axe: 0,
                saw: 0
            }
        }
    });
    useEffect(() => {
        return () => { // save farm to localStorage
            const farms = localStorage.getItem('farms')
            if (farms === null)
              localStorage.setItem('farms', JSON.stringify([farm]));
            else {
              const farmsArr = JSON.parse(farms);
              if (farmsArr[currentFarm] != null){ 
                farmsArr[currentFarm] = farm; 
                localStorage.setItem('farms', JSON.stringify(farmsArr));
                localStorage.setItem('currentFarm', currentFarm.toString());
                }
            }
        }
    }, [farm]);

    useEffect( () => {
        const farms = getFarms();
        setFarm(farms[currentFarm]);
    }, [currentFarm]);
    return (
        <FarmCtx.Provider value={{farm, setFarm}}>
            {children}
        </FarmCtx.Provider>)
}

export function useFarm(){
    const ctx = useContext(FarmCtx);
    if (!ctx) {
        throw new Error('useFarmCtx must be used within a FarmCtxProvider');
    }
    return ctx;
}

// current farm context provider hook
export const CurrentCtx = createContext<CurrentCtx | null>(null);

export function CurrentCtxProvider({children}: any){
    const [currentFarm, setCurrentFarm] = useState( () => {
        const current = localStorage.getItem('currentFarm');
        const index = current? parseInt(current) : 0;
        localStorage.setItem('currentFarm', index.toString());
        return index;
    });
    return (<CurrentCtx.Provider value={{currentFarm, setCurrentFarm}}>
        {children}
    </CurrentCtx.Provider>)
}

export function useCurrentFarm(){
    const ctx = useContext(CurrentCtx);
    if (!ctx) {
        throw new Error('useCurrentCtx must be used within a CurrentCtxProvider');
    }
    return ctx;
}