import { Animated } from "./Animated";
import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { IHasCoordinate } from "./IHasCoordinate";
import { GameState } from "../States/GameState";
import { ChainedAnimation } from "./ChainedAnimation";
import { GroupAnimation } from "./GroupAnimation";


export class Tile extends Animated implements IHasCoordinate {
    public static defaultTileResolution:Point = {x:32, y:32}
    public static variants:Tile[] = []

    public static _initialize():void{
        const grass = new Tile("grass", {x:0, y:0}, ()=>{})
        grass.addAnimation(GroupAnimation.animations[0])
        grass.addAnimation(GroupAnimation.animations[1])
        grass.addAnimation(GroupAnimation.animations[2])

        const floor = new Tile("floor", {x:0, y:0}, ()=>{})
        floor.addAnimation(GroupAnimation.animations[3])


        this.variants = [
            grass,
            floor
        ]

    }

    public static generate(name:string, coordinate:Point, groupAnimations:GroupAnimation[] = []):Tile{
        const temp = this.variants.find(x => x.name == name)
        if(!temp){throw new Error("No such Tile")}

        const copy = new Tile(name, coordinate, temp.stepHandler)
        if(name === "grass")copy.currentAnimationIndex = Math.round(Math.random())
        temp.animations.forEach(x => {
            if(x instanceof GroupAnimation){
                const animation = groupAnimations.find(y => y.animationName === x.animationName)
                if(animation) {
                    copy.addAnimation(animation)
                    return
                }
                throw new Error("Group Animation Not Found, WTH?!")
            }
            if(x instanceof ChainedAnimation){ 
                copy.addAnimation(x.copy(copy))
            }
        })

        return copy
    }

    public coordinate:Point;
    public stepHandler:(tile:Tile,stepper:Entity,gameState:GameState) => void

    constructor(name:string, coordinate:Point, stepHandler:(tile:Tile,stepper:Entity,gameState:GameState)=>void, animations:Animation[] = []){
        super(name, animations)
        this.coordinate = coordinate
        this.stepHandler = stepHandler
    }



    public setCoordinate(value:Point):void{
        this.coordinate = value;
    }
    
    public getCoordinate(): Point {
        return this.coordinate
    }

    public step(stepper:Entity, gameState:GameState):void {
        this.stepHandler(this,stepper,gameState)
    }
}

