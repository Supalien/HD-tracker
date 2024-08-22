import { Farm } from "./schemes";


export default function useCurrent(): number | 0{
    const params = new URLSearchParams(window.location.search);
    const currentFarm = params.get("farm");
    return currentFarm? parseInt(currentFarm) : 0;
} // need to further implement


export function getFarms(): Farm[] {
    return JSON.parse(localStorage.getItem('farms') || '[]'); // farms array or empty array
}