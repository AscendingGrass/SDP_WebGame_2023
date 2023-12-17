import { Animation } from "./Animation";
import { Point } from "./Point";
import { Barrier } from "./Barrier";
import { Unit } from "./Unit";
import { GameManager } from "../GameManager";

export  class InteractableBarrier extends Barrier{

    public interactHandler:(interacted:InteractableBarrier,interactor:Unit, gameState:GameManager) => void

    constructor(name:string, coordinate:Point, interacthandler:(interacted:InteractableBarrier,interactor:Unit, gameState:GameManager) => void, gameState:GameManager, animations:Animation[] = [], ){
        super(name, coordinate, gameState, animations)
        this.interactHandler = interacthandler
    }

    public interact(interactor:Unit, gameState:GameManager):void{
        this.interactHandler(this, interactor, gameState)
    }
}