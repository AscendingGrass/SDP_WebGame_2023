import { Animation } from "./Animation";
import { Tile } from "./Tile";
import { IDestructable } from "./IDestructable";
import { LootTable } from "./LootTable";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { GroupAnimation } from "./GroupAnimation";

export class Grass extends Tile implements IDestructable{
    
    constructor(coordinate:Point){
        super("Grass", coordinate)
        this.addAnimation(GroupAnimation.animations[0])
        this.addAnimation(GroupAnimation.animations[1])
        this.addAnimation(GroupAnimation.animations[2])
        this.currentAnimationIndex = Math.round(Math.random())  
    }

    public step(stepper: Entity): void {
        return;
        throw new Error("Method not implemented.");
    }
}