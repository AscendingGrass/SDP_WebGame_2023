
import { ColoredText } from "./ColoredText"

export class LogView{
    private logArea:HTMLDivElement|null = null
    private logs:ColoredText[][] = []   
    private maxLogs:number

    constructor(
        logArea:HTMLDivElement|null,
        maxLogs:number
        ) {
        this.setLogArea(logArea)
        this.maxLogs = maxLogs
    }

    public setLogArea(value:HTMLDivElement|null){
        this.logArea = value
    }

    public addLog(value:ColoredText[]){
        this.logs.push(value)
        
        if(this.maxLogs != -1 && this.logs.length > this.maxLogs){
            this.logs.shift()
        }

        if(!this.logArea) return
        const logArea = this.logArea
        logArea.innerHTML = ""
        this.logs.forEach(log => {
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

    public getLogs():ColoredText[][]{
        return this.logs
    }

    public getTextlogs():string[]{
        return this.logs.map(log => log.map(text => text.value).join(""))
    }

    public clearLog(){
        this.logs = []
        this.logArea && (this.logArea.innerHTML = "")
    }




}