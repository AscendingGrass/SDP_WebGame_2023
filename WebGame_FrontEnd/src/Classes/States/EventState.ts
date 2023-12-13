import { GameState } from "./GameState";
import { EventProperty } from "./EventProperty";

export class EventState{
    public static eventBluePrints:EventState[] = [
        new EventState(
            "TUT001",
            "Tutorial",
            [
                {
                    name:"progress",
                    value:0
                    // 0 Tutorial Start
                    // 1 Try Talking to NPC
                    // 2 Talking to NPC Complete
                    // 3 Try Walking Around
                    // 4 Walking Complete
                    // 5 Try Opening Door
                    // 6 Opening Door Complete
                }
            ],
            [
                (progressHandler:(progressName:string, currentState:GameState) => void) => {
                    
                }
            ]
        )
    ];

    public id:string
    public name:string
    public properties:EventProperty[]
    public onEventProgressed:( (progressHandler:(progressName:string, currentState:GameState) => void) => void)[]
    public onUpdate:(deltaTime:number, gameState:GameState)=>void
    
    /**
     *
     */
    constructor(id:string, name:string, properties:EventProperty[], onEventProgressed:( (progressHandler:(progressName:string, currentState:GameState) => void) => void)[], onUpdate:(deltaTime:number, gameState:GameState)=>void = ()=>{}) {
        this.id = id
        this.name = name
        this.properties = properties
        this.onEventProgressed = onEventProgressed        
        this.onUpdate = onUpdate
    }

    public update(deltaTime:number, gameState:GameState):void{
        this.onUpdate(deltaTime, gameState)
    }

    public getValueOf(name:string):unknown{
        const property = this.properties.find(property => property.name === name)
        if(property){
            return property.value
        }
        throw Error("Property " + name +" not found")
    }
}