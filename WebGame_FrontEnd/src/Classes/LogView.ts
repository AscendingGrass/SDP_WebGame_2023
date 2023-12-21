
import { ColoredText } from "./ColoredText"
import { GameState } from "./States/GameState"

export class LogView{
    private logArea:HTMLDivElement|null = null
    private gameState:GameState|null
    private maxLogs:number

    constructor(
        logArea:HTMLDivElement|null,
        maxLogs:number,
        gameState:GameState|null = null,
        ) {
        this.setLogArea(logArea)
        this.maxLogs = maxLogs
        this.gameState = gameState
    }

    public setLogArea(value:HTMLDivElement|null){
        this.logArea = value
    }

    public setGameState(gameState:GameState):void{
        this.gameState = gameState
        this.loadLogs();
    }

    public writeSeparator(color:string="green"):void{
        this.addLog(
            [
                {color:color, value:"=========================="}
            ]
        )
    }

    public loadLogs():void{
        if(!this.logArea) return
        const logArea = this.logArea
        logArea.innerHTML = ""
        this.gameState.logs.forEach(log => {
            const logElement = document.createElement('div')
            logElement.classList.add('log')
            log.forEach(text => {
                const textElement = document.createElement('span')
                textElement.classList.add('text')
                textElement.style.color = text.color
                textElement.innerText = text.value
                logElement.appendChild(textElement)
            })
            logArea.appendChild(logElement)
        })
    }

    public addLog(value:ColoredText[]){
        this.gameState.logs.push(value)
        
        if(this.maxLogs != -1 && this.gameState.logs.length > this.maxLogs){
            this.gameState.logs.shift()
        }

        this.loadLogs()
    }

    public getLogs():ColoredText[][]{
        return this.gameState?.logs ?? []
    }

    public getTextlogs():string[]{
        return this.gameState.logs.map(log => log.map(text => text.value).join(""))
    }

    public clearLog(){
        this.gameState.logs = []
        this.logArea && (this.logArea.innerHTML = "")
    }




}