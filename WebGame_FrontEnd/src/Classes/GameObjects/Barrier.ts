import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { GameState } from "../States/GameState";

export  class Barrier extends Entity{
    public static defaultTileResolution:Point = {x:32, y:32}

    public static variantAlias:{[key:string]:string} = {
        'w':'wall',
        'd':'door',
        't':'door_tutorial',
    }

    constructor(name:string, coordinate:Point, gameState:GameState, animations:Animation[] = []){
        super(name, coordinate,gameState, animations)
    }
}