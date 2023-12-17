'use strict';
import { CanvasView } from './Classes/CanvasView';
import { TerminalView } from './Classes/TerminalView';
import { GameManager } from './Classes/GameManager';
import loadAsset from './loadAsset'
import { LogView } from './Classes/LogView';
import { GameState } from './Classes/States/GameState';
let game: GameManager;

const loadGame  = (gameState:GameState|null = null, userId:string) => {
    console.log("loading Game");

    const canvas = document.querySelector("#view") as HTMLCanvasElement
    const terminal = document.querySelector("#console") as HTMLTextAreaElement
    const executeButton = document.querySelector("#executeButton") as HTMLButtonElement
    const stopButton = document.querySelector("#stopButton") as HTMLButtonElement
    const saveButton = document.querySelector("#save") as HTMLButtonElement
    const log = document.querySelector("#log") as HTMLDivElement
    if (canvas == null) throw new Error("Canvas not found");
    if (terminal == null) throw new Error("Console not found");
    if (executeButton == null) throw new Error("Start button not found");
    if (saveButton == null) throw new Error("Save button not found");
    canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight

    loadAsset()
    game = new GameManager(
        new LogView(log,-1),
        new CanvasView(canvas),
        new TerminalView(terminal, executeButton, stopButton)
    )
    game.load(gameState)
    saveButton.onclick = () => {game.save(userId)}
    game.start()
}
export { loadGame }

