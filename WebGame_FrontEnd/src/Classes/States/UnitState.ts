import { Direction } from "../GameObjects/Direction";
import { Point } from "../GameObjects/Point";


export class UnitState{
    public coordinate:Point
    public moveSpeed:number
    public currentHealth:number
    public maxHealth:number
    public direction:Direction
    
    /**
     *
     */
    constructor() {
        
    }
}