import { NPC } from "./NPC"
import { Animation } from "./Animation"
import { GameState } from "../States/GameState"

export type NPCData = {
    name:string,
    talkHandler:(self:NPC)=>void,
    loadHandler:(gameState:GameState, data:NPCData)=>NPC,
    dialogs:string[][],
    animations:Animation[]
}