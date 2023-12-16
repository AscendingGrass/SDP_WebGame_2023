import { EventProperty } from "./EventProperty";
import { NPC } from "../GameObjects/NPC";
import { GameManager } from "../GameManager";
import { Tile } from "../GameObjects/Tile";
import { Entity } from "../GameObjects/Entity";
import { Point } from "../GameObjects/Point";

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
                },
                {
                    name:"target_coordinate",
                    value:{x:4,y:3}
                }
            ],
            {
                "try_talk":(self:EventState)=>{
                    self.getProperty("progress").value = 1;
                },
                "talk_complete":(self:EventState, gameManager:GameManager)=>{
                    self.getProperty("progress").value = 2;

                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            self.progress("try_walk", gameManager)
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                },
                "try_walk":(self:EventState, gameManager:GameManager)=>{
                    const property = self.getProperty("progress")
                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    if(property){
                        property.value = 3
                        gameManager.grid.setTile(targetCoordinate, 'floor', gameManager.groupAnimations);
                        (self.getProperty("NPC").value as NPC)?.talk()
                    }
                    else{
                        throw new Error("Something is not right, progress property is null/undefined");
                    }
                    self.getProperty("progress").value = 3;
                },
                "walk":(self:EventState,gameManager:GameManager)=>{
                    self.getProperty("progress").value = 4;
                    (self.getProperty("NPC").value as NPC).talk()
                },
                "walk_complete":(self:EventState,gameManager:GameManager)=>{
                    self.getProperty("progress").value = 5;
                },
                "open":(self:EventState,gameManager:GameManager)=>{
                    self.getProperty("progress").value = 6;
                },
                "open_complete":(self:EventState,gameManager:GameManager)=>{
                    self.getProperty("progress").value = 7
                },
            })
    ];

    public static start(gameState:GameManager, eventId:string):EventState{
        const event = EventState.eventBluePrints.find(event => event.id === eventId)
        if(!event) throw Error("Event " + eventId + " not found")
        const newEvent = new EventState(
            event.id,
            event.name,
            event.properties.map(x => {return {...x} as EventProperty}),
            event.onEventProgressed,
        )
        gameState.currentState?.eventStates.push(
            newEvent
        )

        return newEvent
    }

    public id:string
    public name:string
    public properties:EventProperty[]
    public onEventProgressed:{[progressName:string]:((self:EventState, gameManager:GameManager) => void)}
    public onUpdate:(deltaTime:number, gameState:GameManager)=>void
    
    /**
     *
     */
    constructor(id:string, name:string, properties:EventProperty[], onEventProgressed:{[progressName:string]:((self:EventState, gameManager:GameManager) => void)}, onUpdate:(deltaTime:number, gameState:GameManager)=>void = ()=>{}) {
        this.id = id
        this.name = name
        this.properties = properties
        this.onEventProgressed = onEventProgressed        
        this.onUpdate = onUpdate
    }

    public update(deltaTime:number, gameState:GameManager):void{
        this.onUpdate(deltaTime, gameState)
    }

    public progress(progressName:string, gameState:GameManager){
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