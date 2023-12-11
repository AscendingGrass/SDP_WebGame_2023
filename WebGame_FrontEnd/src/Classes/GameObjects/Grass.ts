import { Tile } from "./Tile";
import { Point } from "./Point";
import { GroupAnimation } from "./GroupAnimation";

export class Grass extends Tile{
    
    constructor(coordinate:Point){
        super("Grass", coordinate, () => {})
        this.addAnimation(GroupAnimation.animations[0])
        this.addAnimation(GroupAnimation.animations[1])
        this.addAnimation(GroupAnimation.animations[2])
        this.currentAnimationIndex = Math.round(Math.random())  
    }

}