import { EventProperty } from "./EventProperty";
import { NPC } from "../GameObjects/NPC";
import { GameManager } from "../GameManager";
import { Tile } from "../GameObjects/Tile";
import { Entity } from "../GameObjects/Entity";
import { Point } from "../GameObjects/Point";
import { EventState } from "./EventState";

export class Event{
    public static eventBluePrints:Event[] = [
        new Event(
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
                    },
                    {
                        name:"target_coordinate",
                        value:{x:4,y:3}
                    }
                ]
            ),
            {
                "try_talk":(self:Event)=>{
                    self.getProperty("progress").value = 1;
                },
                "talk_complete":(self:Event, gameManager:GameManager, eventArgs:unknown[])=>{
                    self.getProperty("progress").value = 2;

                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            self.progress("try_walk", gameManager, eventArgs)
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                },
                "try_walk":(self:Event, gameManager:GameManager, eventArgs:unknown[])=>{
                    const property = self.getProperty("progress")
                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    if(property){
                        property.value = 3
                        gameManager.grid.setTile(targetCoordinate, 'floor', gameManager.groupAnimations);
                        (eventArgs[0] as NPC)?.talk()
                    }
                    else{
                        throw new Error("Something is not right, progress property is null/undefined");
                    }
                    self.getProperty("progress").value = 3;
                },
                // "walk":(self:Event,gameManager:GameManager, eventArgs:unknown[])=>{
                //     self.getProperty("progress").value = 4;
                //     (eventArgs[0] as NPC)?.talk()
                // },
                // "walk_complete":(self:Event,gameManager:GameManager)=>{
                //     self.getProperty("progress").value = 5;
                // },
                // "open":(self:Event,gameManager:GameManager)=>{
                //     self.getProperty("progress").value = 6;
                // },
                // "open_complete":(self:Event,gameManager:GameManager)=>{
                //     self.getProperty("progress").value = 7
                // },
            })
    ];

    public static start(gameState:GameManager, eventId:string, loadedState?:EventState):Event{
        const event = Event.eventBluePrints.find(event => event.getId() === eventId)
        if(!event) throw Error("Event " + eventId + " not found")
        const state = loadedState ?? new EventState(event.state.id, event.state.name, event.state.properties.map(x => {return {...x} as EventProperty}))
        const newEvent = new Event(
            state,
            event.onEventProgressed,
        )

        if(!gameState.currentState?.eventStates.find(x => x === state)){
            gameState.currentState?.eventStates.push(
                state
            )
        }

        gameState.events.push(newEvent)
        return newEvent
    }

    public state:EventState
    public onEventProgressed:{[progressName:string]:((self:Event, gameManager:GameManager, eventArgs:unknown[]) => void)}
    public onUpdate:(deltaTime:number, gameState:GameManager)=>void
    
    /**
     *
     */
    constructor(state:EventState, onEventProgressed:{[progressName:string]:((self:Event, gameManager:GameManager, eventArgs:unknown[]) => void)}, onUpdate:(deltaTime:number, gameState:GameManager)=>void = ()=>{}) {
        this.state = state
        this.onEventProgressed = onEventProgressed        
        this.onUpdate = onUpdate
    }

    public getId():string { return this.state.id }

    public update(deltaTime:number, gameState:GameManager):void{
        this.onUpdate(deltaTime, gameState)
    }

    public progress(progressName:string, gameState:GameManager, eventArgs:unknown[] = []){
        this.onEventProgressed[progressName](this, gameState, eventArgs)
    }

    public getValueOf(name:string):unknown{
        const property = this.state.properties.find(property => property.name === name)
        if(property){
            return property.value
        }
        throw Error("Property " + name +" not found")
    }

    public getProperty(name:string):EventProperty{
        const property = this.state.properties.find(property => property.name === name)
        if(property){
            return property
        }
        throw Error("Property " + name +" not found")
    }

    
}