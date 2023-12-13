import { Animation } from "./Animation";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { ChainedAnimation } from "./ChainedAnimation";
import { GameState } from "../States/GameState";
import { BarrierData } from "./BarrierData";
import { InteractableBarrier } from "./InteractableBarrier";

export  class Barrier extends Entity{
    public static defaultTileResolution:Point = {x:32, y:32}
    public static variants:BarrierData[] = [
        {
            name:"wall",
            interactHandler:null,
            animations:[]
        },
        {
            name:"door",
            interactHandler:(interacted: InteractableBarrier) => {
                const closed = interacted.getPassable()
                try{
                    interacted.setPassable(!closed)
                }
                catch(err){return}

                if(closed){
                    interacted.playAnimation("door_close")
                }
                else{
                    interacted.playAnimation("door_open")
                }
            },
            animations:[]
        },
        {
            name:"door_tutorial",
            interactHandler:(interacted: InteractableBarrier, interactor: Unit, gameState: GameState) => {
                const closed = interacted.getPassable()
                try{
                    interacted.setPassable(!closed)
                }
                catch(err){return}

                if(closed){
                    interacted.playAnimation("door_close")
                }
                else{
                    interacted.playAnimation("door_open")
                }
            },
            animations:[]
        }
    ]

    public static generate(name:string, coordinate:Point, gameState:GameState):Barrier{
        const temp = this.variants.find(x => x.name == name)
        if(!temp){throw new Error("No such Barrier")}

        const copy = temp.interactHandler ? 
            new InteractableBarrier(name, coordinate, temp.interactHandler, gameState, []) :
            new Barrier(name, coordinate, gameState, [])
        temp.animations.forEach(x => copy.addAnimation(x instanceof ChainedAnimation ? x.copy(copy) : x))

        return copy
    }

    constructor(name:string, coordinate:Point, gameState:GameState, animations:Animation[] = []){
        super(name, coordinate,gameState, animations)
    }
}