import { Animation } from "./Animation"
import { GameState } from "../States/GameState"
import { InteractableBarrier } from "./InteractableBarrier"
import { Unit } from "./Unit"

export type BarrierData = {
    name:string,
    animations:Animation[]
    interactHandler:((interacted:InteractableBarrier, interactor:Unit, gameState:GameState)=>void)|null,
}