import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { GameManager } from "../GameManager";

export  class Barrier extends Entity{
    public static defaultTileResolution:Point = {x:32, y:32}

    public static variantAlias:{[key:string]:string} = {
        'w':'wall',
        'd':'door',
        'D':'door_tutorial',
        't':'tree',
    }

    constructor(name:string, coordinate:Point, gameState:GameManager, animations:Animation[] = []){
        super(name, coordinate,gameState, animations)
    }
}