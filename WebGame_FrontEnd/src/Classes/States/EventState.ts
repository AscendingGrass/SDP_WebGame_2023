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
                    // 0 Event Start
                    // 1 Try Talking to NPC
                    // 2 Talking to NPC Complete
                    // 3 Try Walking Around
                    // 4 Walk complete
                    // 5 Try Opening Door
                    // 6 Opening compelte
                    // 7 Tutorial Complete
                }
            ],
            {
                "try_talk":(self:EventState, currentState:GameState)=>{
                    self.getProperty("progress").value = 1
                },
                "talk_complete":(self:EventState, currentState:GameState)=>{
                    self.getProperty("progress").value = 2
                },
                "try_walk":(self:EventState, currentState:GameState)=>{
                    self.getProperty("progress").value = 3
                },
                "walk":(self:EventState,currentState:GameState)=>{
                    self.getProperty("progress").value = 4
                },
                "walk_complete":(self:EventState,currentState:GameState)=>{
                    self.getProperty("progress").value = 5
                },
                "open":(self:EventState,currentState:GameState)=>{
                    self.getProperty("progress").value = 6
                },
                "open_complete":(self:EventState,currentState:GameState)=>{
                    self.getProperty("progress").value = 7
                },
            })
    ];

    public static start(gameState:GameState, eventId:string):void{
        const event = EventState.eventBluePrints.find(event => event.id === eventId)
        if(!event) throw Error("Event " + eventId + " not found")
        gameState.eventStates.push(
            new EventState(
                event.id,
                event.name,
                event.properties.map(x => {return {...x} as EventProperty}),
                event.onEventProgressed,
            )
        )
    }

    public id:string
    public name:string
    public properties:EventProperty[]
    public onEventProgressed:{[progressName:string]:((self:EventState, currentState:GameState) => void)}
    public onUpdate:(deltaTime:number, gameState:GameState)=>void
    
    /**
     *
     */
    constructor(id:string, name:string, properties:EventProperty[], onEventProgressed:{[progressName:string]:((self:EventState, currentState:GameState) => void)}, onUpdate:(deltaTime:number, gameState:GameState)=>void = ()=>{}) {
        this.id = id
        this.name = name
        this.properties = properties
        this.onEventProgressed = onEventProgressed        
        this.onUpdate = onUpdate
    }

    public update(deltaTime:number, gameState:GameState):void{
        this.onUpdate(deltaTime, gameState)
    }

    public progress(progressName:string, gameState:GameState){
        this.onEventProgressed[progressName](this, gameState)
    }

    public getValueOf(name:string):unknown{
        const property = this.properties.find(property => property.name === name)
        if(property){
            return property.value
        }
        throw Error("Property " + name +" not found")
    }

    public getProperty(name:string):EventProperty{
        const property = this.properties.find(property => property.name === name)
        if(property){
            return property
        }
        throw Error("Property " + name +" not found")
    }

    
}