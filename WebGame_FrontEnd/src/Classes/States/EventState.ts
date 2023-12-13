import { GameState } from "./GameState";
import { EventProperty } from "./EventProperty";

export class EventState{
    public static eventBluePrints:EventState[] = [
        new EventState(
            "TUT001",
            "Tutorial",
            [],
            []
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
}