
export interface Items {
    bolt: number | undefined;
    plank: number | undefined;
    tape: number | undefined;
    nails: number | undefined;
    screw: number | undefined;
    panel: number | undefined;
    deed: number | undefined;
    mallet: number | undefined;
    marker: number | undefined;
    dynamite: number | undefined;
    tnt: number | undefined;
    shovel: number | undefined;
    pick: number | undefined;
    axe: number | undefined;
    saw: number | undefined;
}

export interface Farm {
    name: string | undefined;
    level: number | undefined;
    fields: number | undefined;
    items: Items;
}