import { Animation } from "./Animation";
import { GameState } from "../States/GameState";
import { UnitState } from "../States/UnitState";
import { Unit } from "./Unit";

export class Enemy extends Unit{

    public behaviorHandler:(self:Enemy, deltaTime:number,gameState:GameState) => void;

    constructor(
        state:UnitState, 
        name:string, 
        gameState:GameState, 
        behaviorHandler:(self:Enemy, deltaTime:number, gameState:GameState) => void, 
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