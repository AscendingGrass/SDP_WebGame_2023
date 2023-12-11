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
    constructor(coordinate:Point = {x:0, y:0}, moveSpeed:number = 1, currentHealth:number = 10, maxHealth:number = 10, direction:Direction = Direction.Down) {
        this.coordinate = coordinate
        this.moveSpeed = moveSpeed
        this.currentHealth = currentHealth
        this.maxHealth = maxHealth
        this.direction = direction
    }
}