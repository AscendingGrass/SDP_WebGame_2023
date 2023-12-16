import { Animation } from "./Animation"
import { InteractableBarrier } from "./InteractableBarrier"
import { Unit } from "./Unit"
import { GameManager } from "../GameManager"

export type BarrierData = {
    name:string,
    animations:Animation[]
    interactHandler:((interacted:InteractableBarrier, interactor:Unit, gameState:GameManager)=>void)|null,
}