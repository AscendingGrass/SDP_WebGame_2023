import { UnitState } from "./UnitState";
import { Point } from "../GameObjects/Point";
import { Direction } from "../GameObjects/Direction";

export class PlayerState extends UnitState{
    public currentEnergy:number
    public maxEnergy:number
    public inventoryItemIndexState:number[]
    public equippedItemIndexState:number[]

    /**
     *
     */
    constructor(
        coordinate:Point = {x:0, y:0}, 
        moveSpeed:number = 1, 
        currentHealth:number = 10, 
        maxHealth:number = 10, 
        direction:Direction = Direction.Down, 
        currentEnergy:number = 10, 
        maxEnergy:number = 10,
        inventoryItemIndexState:number[] = [],
        equippedItemIndexState:number[] = []

        ) {
        super(coordinate, moveSpeed, currentHealth, maxHealth, direction);
        this.currentEnergy = currentEnergy
        this.maxEnergy = maxEnergy
        this.inventoryItemIndexState = inventoryItemIndexState
        this.equippedItemIndexState = equippedItemIndexState
    }
}