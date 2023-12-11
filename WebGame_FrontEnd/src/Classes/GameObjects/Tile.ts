import { Animated } from "./Animated";
import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { IHasCoordinate } from "./IHasCoordinate";
import { GameState } from "../States/GameState";
import { ChainedAnimation } from "./ChainedAnimation";


export class Tile extends Animated implements IHasCoordinate {
    public static defaultTileResolution:Point = {x:32, y:32}
    public static variants:Tile[] = [
        
    ]

    public static generate(name:string, coordinate:Point):Tile{
        const temp = this.variants.find(x => x.name == name)
        if(!temp){throw new Error("No such Tile")}

        const copy = new Tile(name, coordinate, temp.stepHandler)
        temp.animations.forEach(x => copy.addAnimation(x instanceof ChainedAnimation ? x.copy(copy) : x))

        return copy

    }

    public coordinate:Point;
    public stepHandler:(tile:Tile,stepper:Entity,gameState:GameState) => void

    constructor(name:string, coordinate:Point, stepHandler:(tile:Tile,stepper:Entity,gameState:GameState)=>void, animations:Animation[] = []){
        super(name, animations)
        this.coordinate = coordinate
        this.stepHandler = stepHandler
    }

    setCoordinate(value:Point):void{
        this.coordinate = value;
    }
    
    getCoordinate(): Point {
        return this.coordinate
    }

    public step(stepper:Entity, gameState:GameState):void {
        this.stepHandler(this,stepper,gameState)
    }
}