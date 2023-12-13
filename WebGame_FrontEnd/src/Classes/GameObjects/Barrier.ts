import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { ChainedAnimation } from "./ChainedAnimation";
import { GameState } from "../States/GameState";

export  class Barrier extends Entity{
    public static defaultTileResolution:Point = {x:32, y:32}
    public static variants:Barrier[] = [
        
    ]

    public static generate(name:string, coordinate:Point):Barrier{
        const temp = this.variants.find(x => x.name == name)
        if(!temp){throw new Error("No such Barrier")}

        const copy = new Barrier(name, coordinate, temp.gameState, [])
        temp.animations.forEach(x => copy.addAnimation(x instanceof ChainedAnimation ? x.copy(copy) : x))

        return copy
    }

    constructor(name:string, coordinate:Point, gameState:GameState, animations:Animation[] = []){
        super(name, coordinate,gameState, animations)
    }
}