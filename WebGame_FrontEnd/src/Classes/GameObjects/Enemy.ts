import { Animation } from "./Animation";
import { GameState } from "../States/GameState";
import { UnitState } from "../States/UnitState";
import { Unit } from "./Unit";
import { GameManager } from "../GameManager";

export class Enemy extends Unit{

    public behaviorHandler:(self:Enemy, deltaTime:number,gameState:GameManager) => void;

    constructor(
        state:UnitState, 
        name:string, 
        gameState:GameManager, 
        behaviorHandler:(self:Enemy, deltaTime:number, gameState:GameManager) => void, 
        animations:Animation[]
        ){
        super(state, name, gameState, animations)
        this.behaviorHandler = behaviorHandler
    }

    public update(deltaTime: number): void {
        this.behaviorHandler(this, deltaTime, this.gameState)
        super.update(deltaTime)
    }
}