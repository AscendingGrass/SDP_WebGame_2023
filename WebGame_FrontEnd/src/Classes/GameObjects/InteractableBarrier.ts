import { Animation } from "./Animation";
import { Point } from "./Point";
import { Barrier } from "./Barrier";
import { GameState } from "../States/GameState";
import { Unit } from "./Unit";

export  class InteractableBarrier extends Barrier{

    public interactHandler:(interacted:InteractableBarrier,interactor:Unit, gameState:GameState) => void

    constructor(name:string, coordinate:Point, interacthandler:(interacted:InteractableBarrier,interactor:Unit, gameState:GameState) => void, gameState:GameState, animations:Animation[] = [], ){
        super(name, coordinate, gameState, animations)
        this.interactHandler = interacthandler
    }

    public interact(interactor:Unit, gameState:GameState):void{
        this.interactHandler(this, interactor, gameState)
    }
}