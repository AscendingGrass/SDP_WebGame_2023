import { EventProperty } from "./EventProperty";
import { NPC } from "../GameObjects/NPC";
import { GameManager } from "../GameManager";
import { Tile } from "../GameObjects/Tile";
import { Entity } from "../GameObjects/Entity";
import { Point } from "../GameObjects/Point";
import { EventState } from "./EventState";
import { InteractableBarrier } from "../GameObjects/InteractableBarrier";
import { Unit } from "../GameObjects/Unit";

export class Event{
    public static eventBluePrints:Event[] = [
        new Event(
            new EventState(
                "TUT001",
                "Movement Tutorial",
                [
                    {
                        name:"progress",
                        value:0
                        // 0 Event Start
                        // 1 Try Talking to NPC
                        // 2 Talking to NPC Complete
                        // 3 Try Walking Around
                        // 4 Try Walking Around 2
                        // 5 Walk complete 1
                        // 6 Walk failed
                        // 7 Walk completed
                        // 8 Exiting
                        // 9 Tutorial Complete
                    },
                    {
                        name:"target_coordinate",
                        value:{x:4,y:3}
                    },
                    {
                        name:"target_coordinate_2",
                        value:{x:3,y:5}
                    },
                    {
                        name:"target_coordinates",
                        value:[{x:1,y:1}, {x:2,y:4}, {x:5,y:2}]
                    },
                    {
                        name:"flag",
                        value:0 
                    },
                    {
                        name:"stepped_target_coordinates",
                        value:0 
                    },
                    {
                        name:"NPC_name",
                        value:"Tutorial Guy"
                    }
                ],
                2 // easy
            ),
            {
                "try_talk":(self:Event, gameManager:GameManager)=>{
                    self.getProperty("progress").value = 1;
                    gameManager.logView?.addLog([
                        {
                            value: self.state.name.toUpperCase() + " QUEST STARTED",
                            color:"green"
                        }
                    ])
                    gameManager.logView?.addLog([
                        {
                            value:"DIFFICULTY: ",
                            color:"green"
                        },
                        {
                            value:"HARD",
                            color:"red"
                        }
                    ])
                    gameManager.logView?.writeSeparator()
                },
                "talk_complete":(self:Event, gameManager:GameManager, eventArgs:unknown[])=>{
                    self.getProperty("progress").value = 2;

                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            self.progress("try_walk", gameManager, eventArgs)
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                },
                "try_walk":(self:Event, gameManager:GameManager, eventArgs:unknown[])=>{
                    const property = self.getProperty("progress")
                    const targetCoordinate = self.getProperty("target_coordinate").value as Point
                    const targetCoordinate2 = self.getProperty("target_coordinate_2").value as Point
                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            self.progress("try_walk_2", gameManager, eventArgs)
                        }
                    }

                    if(property){
                        property.value = 3
                        gameManager.grid.setTile(targetCoordinate, 'floor', gameManager.groupAnimations);
                        gameManager.grid.setTile(targetCoordinate2, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler;

                        (eventArgs[0] as NPC)?.talk()
                    }
                    else{
                        throw new Error("Something is not right, progress property is null/undefined");
                    }
                },
                "try_walk_2":(self:Event, gameManager:GameManager, eventArgs:unknown[])=>{
                    const property = self.getProperty("progress")
                    const targetCoordinate2 = self.getProperty("target_coordinate_2").value as Point

                    if(property){
                        property.value = 4
                        gameManager.grid.setTile(targetCoordinate2, 'floor', gameManager.groupAnimations);

                        (eventArgs[0] as NPC)?.talk()
                        property.value = 5
                    }
                    else{
                        throw new Error("Something is not right, progress property is null/undefined");
                    }
                },
                "walk_complete_1":(self:Event,gameManager:GameManager, eventArgs:unknown[])=>{

                    const targetCoordinates = self.getValueOf("target_coordinates") as Point[]
                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            const property = self.getProperty("stepped_target_coordinates")
                            tile.stepHandler = () => {}
                            gameManager.grid.setTile(tile.coordinate, 'floor', gameManager.groupAnimations);
                            property.value = (property.value as number) + 1
                            console.log(property.value);
                            console.log(self.getValueOf("progress"));
                            if(property.value as number == targetCoordinates.length && self.getValueOf("flag") == 0){
                                self.getProperty("progress").value = 7
                                gameManager.player?.terminal.onStopped.splice(
                                    gameManager.player?.terminal.onStopped.indexOf(onFinishRunning), 
                                    1
                                );
                                (eventArgs[0] as NPC)?.talk()
                            }
                        }
                    }
                    const onFinishRunning = () => {
                        const flag = self.getProperty("flag")
                        const property = self.getProperty("stepped_target_coordinates")
                        const progress = self.getProperty("progress")
                        // if property.value == -1 the NPC wont talk
                        // initially set to -1 to prevent a bug
                        if(flag.value == 0 && progress.value != 7){ 
                            flag.value = 1
                            return
                        }

                        if(property.value as number === targetCoordinates.length || progress.value == 7){
                            self.getProperty("progress").value = 7
                            gameManager.player?.terminal.onStopped.splice(
                                gameManager.player?.terminal.onStopped.indexOf(onFinishRunning), 
                                1
                            );
                        }
                        else {
                            property.value = 0
                            targetCoordinates.forEach(x => {
                                gameManager.grid.tiles[x.y][x.x]!.stepHandler = () => {}
                                gameManager.grid.setTile(x, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler;
                            })
                            self.getProperty("progress").value = 6;
                        }

                        (eventArgs[0] as NPC)?.talk()
                    }

                    gameManager.player?.terminal.onStopped.push(onFinishRunning)
                    
                    targetCoordinates.forEach(x => {
                        gameManager.grid.setTile(x, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler;
                    })
                },
                "exit":(self:Event,gameManager:GameManager)=>{
                    self.getProperty("progress").value = 8;
                    const doorCoordinate:Point = {x:6,y:3}
                    const noDoor = Error(`There is no door at ${doorCoordinate.x}, ${doorCoordinate.y}`)
                    const onInteract = (interacted:InteractableBarrier,interactor:Unit, gameState:GameManager) => {
                        if(!interacted.getPassable() && interactor == gameState.player && interactor.getCoordinate().x > 6){
                            // If the player went out and closed the door
                            interacted.onInteract = () => {}
                            self.progress("tutorial_finished", gameManager)
                        }
                    }

                    const door = gameManager.grid.entityGrid[doorCoordinate.y][doorCoordinate.x] as InteractableBarrier
                    if(!door) throw noDoor
                    if(door.getName() != "door") throw noDoor

                    door.onInteract = onInteract

                },
                "tutorial_finished":(self:Event,gameManager:GameManager)=>{
                    self.getProperty("progress").value = 9;
                    const state = gameManager.currentState
                    if(!state) throw Error("GameManager has no GameState")
                    const reward = 100 + Math.round(Math.max((750 - (state.playtime)), 0)/ 10)
                    state.score += reward
                    gameManager.logView?.addLog([
                        {color:"green", value:`${self.state.name.toUpperCase()} QUEST CLEARED! YOU GOT ${reward} POINTS`},
                    ])
                    gameManager.logView?.writeSeparator()
                    
                }
            },
            (self:Event, gameManager:GameManager)=>{ // onload handler
                const progress = self.getValueOf("progress") as number
                console.log("OOOOOOOH : " + progress);
                if(progress == 2){
                    const targetCoordinate = self.getValueOf("target_coordinate") as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            self.progress("try_walk", gameManager, [gameState.grid.entities.find(x => x.getName() === (self.getValueOf("NPC_name") as string))])
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                }else if(progress == 3){
                    const targetCoordinate2 = self.getProperty("target_coordinate_2").value as Point
                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            self.progress("try_walk_2", gameManager, [gameManager.grid.entityGrid[3][2]])
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate2, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler;
                }else if(progress == 4){
                    self.getProperty("progress").value = 5;
                    (gameManager.grid.entityGrid[3][2] as NPC).talk()
                }else if(progress == 5 || progress == 6){
                    const npc = gameManager.grid.entityGrid[3][2] as NPC
                    const targetCoordinates = self.getValueOf("target_coordinates") as Point[]
                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            const property = self.getProperty("stepped_target_coordinates")
                            tile.stepHandler = () => {}
                            gameManager.grid.setTile(tile.coordinate, 'floor', gameManager.groupAnimations);
                            property.value = (property.value as number) + 1
                            console.log(property.value);
                            console.log(self.getValueOf("progress"));
                            if(property.value as number == targetCoordinates.length && self.getValueOf("flag") == 0){
                                self.getProperty("progress").value = 7
                                gameManager.player?.terminal.onStopped.splice(
                                    gameManager.player?.terminal.onStopped.indexOf(onFinishRunning), 
                                    1
                                );
                                npc?.talk()
                            }
                        }
                    }
                    const onFinishRunning = () => {
                        const property = self.getProperty("stepped_target_coordinates")
                        const progress = self.getProperty("progress")
                        

                        if(property.value as number === targetCoordinates.length || progress.value == 7){
                            self.getProperty("progress").value = 7
                            gameManager.player?.terminal.onStopped.splice(
                                gameManager.player?.terminal.onStopped.indexOf(onFinishRunning), 
                                1
                            );
                        }
                        else {
                            property.value = 0
                            targetCoordinates.forEach(x => {
                                gameManager.grid.tiles[x.y][x.x]!.stepHandler = () => {}
                                gameManager.grid.setTile(x, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler;
                            })
                            self.getProperty("progress").value = 6;
                        }

                        npc?.talk()
                    }

                    gameManager.player?.terminal.onStopped.push(onFinishRunning)
                    
                    targetCoordinates.forEach(x => {
                        gameManager.grid.setTile(x, 'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler;
                    })
                }else if(progress == 7 || progress == 8){
                    self.getProperty("progress").value = 8;
                    const doorCoordinate:Point = {x:6,y:3}
                    const noDoor = Error(`There is no door at ${doorCoordinate.x}, ${doorCoordinate.y}`)
                    const onInteract = (interacted:InteractableBarrier,interactor:Unit, gameState:GameManager) => {
                        if(!interacted.getPassable() && interactor == gameState.player && interactor.getCoordinate().x > 6){
                            // If the player went out and closed the door
                            interacted.onInteract = () => {}
                            self.progress("tutorial_finished", gameManager)
                        }
                    }

                    const door = gameManager.grid.entityGrid[doorCoordinate.y][doorCoordinate.x] as InteractableBarrier
                    if(!door) throw noDoor
                    if(door.getName() != "door") throw noDoor

                    door.onInteract = onInteract
                }else if(progress == 9){
                    null;
                }else{
                    throw new Error("unhandled progress state when loading tutorial")
                }

            }
        ),
        new Event(
            new EventState(
                "CMP001",
                "Go to the other room",
                [
                    {
                        name:"progress",
                        value:0
                        // 0 Initial State
                        // 1 Quest Started
                        // 2 Quest Completed
                    },
                    {
                        name:"target_coordinate",
                        value:{x:4,y:14}
                    },
                ],
                1 // medium
            ),
            {
                "start":(self:Event, gameManager:GameManager)=>{
                    self.getProperty("progress").value = 1;
                    gameManager.logView?.addLog([
                        {
                            value: self.state.name.toUpperCase() + " QUEST STARTED",
                            color: "green"
                        }
                    ])
                    gameManager.logView?.addLog([
                        {
                            value:"DIFFICULTY: ",
                            color:"green"
                        },
                        {
                            value:"MEDIUM",
                            color:"yellow"
                        }
                    ])
                    gameManager.logView?.writeSeparator()
                    
                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            gameManager.grid.setTile(targetCoordinate, 'floor', gameManager.groupAnimations);
                            self.progress("completed", gameManager)
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                },
                "completed":(self:Event, gameManager:GameManager)=>{
                    self.getProperty("progress").value = 2;
                    const state = gameManager.currentState
                    const reward = 50
                    if(!state) throw Error("GameManager has no GameState")
                    state.score += reward
                    gameManager.logView?.addLog([
                        {color:"green", value:`${self.state.name.toUpperCase()} QUEST CLEARED! YOU GOT ${reward} POINTS`},
                    ])
                    gameManager.logView?.writeSeparator()
                },
            },
            (self:Event, gameManager:GameManager)=>{ // onload handler
                const progress = self.getValueOf("progress") as number
                if(progress == 1){
                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            gameManager.grid.setTile(targetCoordinate, 'floor', gameManager.groupAnimations);
                            self.progress("completed", gameManager)
                        }
                    }

                    gameManager.grid.setTile(targetCoordinate,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                }else if(progress == 2){
                    null
                }else{
                    throw new Error("unhandled progress state when loading tutorial")
                }

            }
        ),
        new Event(
            new EventState(
                "CMP002",
                "Step Left!",
                [
                    {
                        name:"progress",
                        value:0
                        // 0 Initial State
                        // 1 Quest Started
                        // 2 Quest Completed
                    },
                    {
                        name:"target_coordinate",
                        value:{x:0,y:0}
                    },
                ],
                0 // easy
            ),
            {
                "start":(self:Event, gameManager:GameManager)=>{
                    self.getProperty("progress").value = 1;
                    gameManager.logView?.addLog([
                        {
                            value: self.state.name.toUpperCase() + " QUEST STARTED",
                            color: "green"
                        }
                    ])
                    gameManager.logView?.addLog([
                        {
                            value:"DIFFICULTY: ",
                            color:"green"
                        },
                        {
                            value:"EASY",
                            color:"green"
                        }
                    ])
                    gameManager.logView?.writeSeparator()
                    
                    const targetCoordinate = self.getProperty("target_coordinate")
                    let targetCoordinateValue = gameManager.player?.getCoordinate()
                    if(!targetCoordinateValue) throw Error("there is no player")
                    targetCoordinateValue = {x:targetCoordinateValue.x - 1, y:targetCoordinateValue.y} as Point
                    targetCoordinate.value = targetCoordinateValue

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            gameManager.grid.setTile(targetCoordinate.value as Point, 'floor', gameManager.groupAnimations);
                            self.progress("completed", gameManager)
                        }
                    }

                    gameManager.grid.setTile(targetCoordinateValue,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler
                },
                "completed":(self:Event, gameManager:GameManager)=>{
                    self.getProperty("progress").value = 2;
                    const state = gameManager.currentState
                    const reward = 15
                    if(!state) throw Error("GameManager has no GameState")
                    state.score += reward
                    gameManager.logView?.addLog([
                        {color:"green", value:`${self.state.name.toUpperCase()} QUEST CLEARED! YOU GOT ${reward} POINTS`},
                    ])
                    gameManager.logView?.writeSeparator()
                },
            },
            (self:Event, gameManager:GameManager)=>{ // onload handler
                const progress = self.getValueOf("progress") as number
                if(progress == 1){
                    const targetCoordinate = self.getProperty("target_coordinate").value as Point

                    const stepHandler = (tile: Tile, stepper: Entity, gameState: GameManager) => {
                        if(stepper == gameState.player){
                            tile.stepHandler = () => {}
                            gameManager.grid.setTile(targetCoordinate, 'floor', gameManager.groupAnimations);
                            self.progress("completed", gameManager)
                        }
                    }
                    gameManager.grid.setTile(targetCoordinate,'marked_floor', gameManager.groupAnimations).stepHandler = stepHandler

                }else if(progress == 2){
                    null
                }else{
                    throw new Error("unhandled progress state when loading tutorial")
                }

            }
        ),
        // new Event(
        //     new EventState(
        //         "TUT002",
        //         "Branching Tutorial",
        //         [
        //             {
        //                 name:"progress",
        //                 value:0
        //                 // 0 Event Start
        //                 // 1 Try Talking to NPC
        //                 // 2 Talking to NPC Complete
        //                 // 3 Try Walking Around
        //                 // 4 Try Walking Around 2
        //                 // 5 Walk complete 1
        //                 // 6 Walk failed
        //                 // 7 Walk completed
        //                 // 8 Exiting
        //                 // 9 Tutorial Complete
        //             },
        //         ],
        //         1 // medium
        //     ),
        //     {

        //     },
        //     (self:Event, gameManager:GameManager)=>{ // onload handler

        //     }
        // ),
        // new Event(
        //     new EventState(
        //         "TUT003",
        //         "Looping Tutorial",
        //         [
        //             {
        //                 name:"progress",
        //                 value:0
        //                 // 0 Event Start
        //                 // 1 Try Talking to NPC
        //                 // 2 Talking to NPC Complete
        //                 // 3 Try Walking Around
        //                 // 4 Try Walking Around 2
        //                 // 5 Walk complete 1
        //                 // 6 Walk failed
        //                 // 7 Walk completed
        //                 // 8 Exiting
        //                 // 9 Tutorial Complete
        //             },
        //         ],
        //         1 // medium
        //     ),
        //     {

        //     },
        //     (self:Event, gameManager:GameManager)=>{ // onload handler

        //     }
        // )
    ];

    public static start(gameState:GameManager, eventId:string, loadedState?:EventState):Event{
        const event = Event.eventBluePrints.find(event => event.getId() === eventId)
        if(!event) throw Error("Event " + eventId + " not found")
        const state = loadedState ?? new EventState(event.state.id, event.state.name, event.state.properties.map(x => {return {...x} as EventProperty}), event.state.difficulty)
        const newEvent = new Event(
            state,
            event.onEventProgressed,
            event.onLoad,
            event.onUpdate
        )

        

        if(!gameState.currentState?.eventStates.find(x => x === state)){
            gameState.events.push(newEvent)
            gameState.currentState?.eventStates.push(
                state
            )
            return newEvent
        }
        else{
            gameState.events.push(newEvent)
            // gameState.currentState!.eventStates[gameState.currentState?.eventStates.findIndex(x=>x.id===state.id)] = state
            newEvent.load(gameState)
            return newEvent
        }

        // if(loadedState){
           
        // }

        throw Error("Event " + eventId + " already started")
    }

    public state:EventState
    public onEventProgressed:{[progressName:string]:((self:Event, gameManager:GameManager, eventArgs:unknown[]) => void)}
    public onUpdate:(deltaTime:number, gameState:GameManager)=>void
    public onLoad:(self:Event, gameManager:GameManager)=>void
    
    /**
     *
     */
    constructor(state:EventState, onEventProgressed:{[progressName:string]:((self:Event, gameManager:GameManager, eventArgs:unknown[]) => void)}, onLoad:(self:Event, gameManager:GameManager)=>void = () => {}, onUpdate:(deltaTime:number, gameState:GameManager)=>void = ()=>{}) {
        this.state = state
        this.onEventProgressed = onEventProgressed        
        this.onUpdate = onUpdate
        this.onLoad = onLoad
    }

    public getId():string { return this.state.id }

    public update(deltaTime:number, gameState:GameManager):void{
        this.onUpdate(deltaTime, gameState)
    }

    public load(gameManager:GameManager):void{
        this.onLoad(this, gameManager)
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