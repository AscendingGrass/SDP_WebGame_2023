import { NPC } from "./NPC"
import { Animation } from "./Animation"
import { GameManager } from "../GameManager"

export type NPCData = {
    name:string,
    talkHandler:(self:NPC)=>void,
    loadHandler:(gameState:GameManager, data:NPCData)=>NPC,
    dialogs:string[][],
    animations:Animation[]
}