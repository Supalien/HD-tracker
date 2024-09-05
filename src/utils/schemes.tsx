
export interface Items {
    bolt?: number;
    plank?: number;
    tape?: number;
    nails?: number;
    screw?: number;
    panel?: number;
    deed?: number;
    mallet?: number;
    marker?: number;
    dynamite?: number;
    tnt?: number;
    shovel?: number;
    pick?: number;
    axe?: number;
    saw?: number;
    [key: string]: number | undefined;
}

export interface Farm {
    name: string | undefined;
    level: number | undefined;
    fields: number | undefined;
    items: Items;
}