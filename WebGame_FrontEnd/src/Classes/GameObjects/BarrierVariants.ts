import { Animation } from "./Animation";
import { ChainedAnimation } from "./ChainedAnimation";
import { InteractableBarrier } from "./InteractableBarrier";
import { GroupAnimation } from "./GroupAnimation";
import { Point } from "framer-motion";
import { Barrier } from "./Barrier";
import { BarrierData } from "./BarrierData";
import { GameManager } from "../GameManager";

const BarrierVariants:BarrierData[] = []

export const generateBarrier:(name:string, coordinate:Point, gameState:GameManager, groupAnimations:GroupAnimation[]) => Barrier =(name:string, coordinate:Point, gameState:GameManager, groupAnimations:GroupAnimation[]) => {
    const temp = BarrierVariants.find(x => x.name == name)
    if(!temp){throw new Error("No such Barrier " + name)}

    const copy = temp.interactHandler ? 
        new InteractableBarrier(name, coordinate, temp.interactHandler, gameState, []) :
        new Barrier(name, coordinate, gameState, [])
    
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


export const barrierVariants = BarrierVariants; 

export const _initializeBarrierVariants = () => {
    BarrierVariants.push(...[
        {
            name:"wall",
            interactHandler:null,
            animations:[GroupAnimation.animations[4]]
        },
        {
            name:"tree",
            interactHandler:null,
            animations:[GroupAnimation.animations[6]]
        },
        {
            name:"door",
            interactHandler:(interacted: InteractableBarrier) => {
                const closed = interacted.getPassable()
                console.log(closed);
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
            animations:[
                new ChainedAnimation(
                    null,
                     "door_close", 
                     Animation.assets["door_closed"], 
                     {x:32, y:32},
                    1,
                    -1,
                    0
                ),
                new ChainedAnimation(
                    null,
                     "door_open", 
                     Animation.assets["door_opened"], 
                     {x:32, y:32},
                    1,
                    -1,
                    0
                ),
            ]
        },
        // {
        //     name:"door_tutorial",
        //     interactHandler:(interacted: InteractableBarrier, interactor: Unit, gameState: GameManager) => {
        //         const closed = interacted.getPassable()
        //         try{
        //             interacted.setPassable(!closed)
        //         }
        //         catch(err){return}
    
        //         if(closed){
        //             interacted.playAnimation("door_close")
        //         }
        //         else{
        //             interacted.playAnimation("door_open")
        //         }
        //     },
        //     animations:[]
        // }
    ])
}