import { UnitState } from "./UnitState";

export class PlayerState extends UnitState{
    public currentEnergy:number
    public maxEnergy:number
    public inventoryItemIndexState:number[]
    public equippedItemIndexState:number[]

    /**
     *
     */
    constructor() {
        super();
        
    }
}