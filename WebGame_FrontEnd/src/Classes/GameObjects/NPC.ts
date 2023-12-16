import { Animation } from "./Animation";
import { UnitState } from "../States/UnitState";
import { Unit } from "./Unit";
import { NPCData } from "./NPCData";
import { Point } from "./Point";
import { ChainedAnimation } from "./ChainedAnimation";
import { GameManager } from "../GameManager";
import { Event } from "../States/Event";

export class NPC extends Unit{
    public static NPCData:NPCData[] = []

    public static _initialize(){
        this.NPCData.push(...[
            {
                name:"Tutorial Guy",
                talkHandler:(self:NPC)=>{
                    const gameState = self.gameState

                    const eventState = gameState?.events.find(x => x.getId() === "TUT001")
                    if(!eventState) {
                        const temp = Event.start(self.gameState,"TUT001")
                        temp.state.properties.push({name:"NPC", value:self})
                    }


                    switch(eventState?.getValueOf("progress")){
                        case 0:
                            self.dialogIndex = 0
                            eventState?.progress("try_talk", self.gameState)
                            break;
                        case 1:
                            self.dialogIndex = 1
                            eventState?.progress("talk_complete", self.gameState, [self])
                            break;
                        case 2:
                            self.dialogIndex = 1
                            break;
                        case 3:
                            self.dialogIndex = 2
                            break;
                    }


                    while(self.dialogProgress < self.dialogs[self.dialogIndex].length){
                        self.gameState?.logView?.addLog(
                            [
                                {color:"green", value:self.name + " : "},
                                {color:"black", value:self.dialogs[self.dialogIndex][self.dialogProgress]}
                            ]
                        )
                        self.dialogProgress++
                    }
                    self.gameState?.logView?.addLog(
                        [
                            {color:"green", value:"=========================="}
                        ]
                    )
                    self.dialogProgress = 0
                    self.dialogIndex = -1
                },
                // LOAD HANDLER
                loadHandler: (gameState:GameManager, data:NPCData)=>{
                    const spawn:Point = {x:3, y:2}
                    // const eventState = gameState.eventStates[0]
                    const newNPC = new NPC(
                        new UnitState(spawn),
                        data.name,
                        gameState,
                        data.talkHandler,
                        data.dialogs,
                        []
                    )
                        
                    Animation.makeCopyIfChained(data.animations,newNPC).forEach(x => newNPC.addAnimation(x))

                    Event.start(gameState,"TUT001").state.properties.push({name:"NPC", value:newNPC})
                    newNPC.talk();
                    
                    return newNPC
                    
                },
                dialogs:[
                    [
                        "Hello!",
                        "I'm the tutorial guy.",
                        "Try talking to me by writing 'self.talk();' and running the code"
                    ],
                    [
                        "WOW You just talked to me!",
                        "You can also move to the right using 'self.moveRight();'",
                        "Try moving to the marked floor to your right!'",
                    ],
                    [
                        "I don't know what to say...",
                        "There is someone smart enough to talk!",
                    ],
                    [
                        "You are the one!",
                        "The only person with at least 3 IQ!!!",
                        "You must be! because you can talk!"
                    ]
                ],
                animations:[
                    new ChainedAnimation(
                        null,
                        "idle",
                        Animation.assets['tutorialguy_idle'],
                        {x:32, y:32},
                        1,
                        -1,
                        0
                    )
                ]
            },
            // {
            //     name:"Tutorial Guy No 2",
            //     talkHandler:(self:NPC)=>{
            //         const gameState = self.gameState.currentState
            //         const eventState = gameState?.eventStates.find(x => x.id === "TUT002")
            //         if(!eventState) EventState.start(self.gameState,"TUT002")
            //         // switch(eventState?.getValueOf("progress")){
            //         //     case 0:
            //         //         self.dialogIndex = 0
            //         //         eventState?.progress("try_talk", self.gameState)
            //         //         break;
            //         //     case 1:
            //         //         self.dialogIndex = 1
            //         //         eventState?.progress("talk_complete", self.gameState)
            //         //         break;
            //         //     case 2:
            //         //         self.dialogIndex = 2 + Math.round(Math.random())
            //         // }

            //         // while(self.dialogProgress < self.dialogs[self.dialogIndex].length){
            //         //     self.gameState.logs.addLog(
            //         //         [
            //         //             {color:"green", value:self.name + " : "},
            //         //             {color:"black", value:self.dialogs[self.dialogIndex][self.dialogProgress]}
            //         //         ]
            //         //     )
            //         //     self.dialogProgress++
            //         // }
            //         // self.gameState.logs.addLog(
            //         //     [
            //         //         {color:"green", value:"=========================="}
            //         //     ]
            //         // )
            //         // self.dialogProgress = 0
            //         // self.dialogIndex = -1
            //     },
            //     // LOAD HANDLER
            //     loadHandler: (gameState:GameManager, data:NPCData)=>{
            //         const spawn:Point = {x:3, y:2}
            //         // const eventState = gameState.eventStates[0]
            //         const newNPC = new NPC(
            //             new UnitState(spawn),
            //             data.name,
            //             gameState,
            //             data.talkHandler,
            //             data.dialogs,
            //             []
            //         )
                        
            //         Animation.makeCopyIfChained(data.animations,newNPC).forEach(x => newNPC.addAnimation(x))
                    
            //         return newNPC
                    
            //     },
            //     dialogs:[
            //         [
            //             "Hello!",
            //             "I'm the tutorial guy.",
            //             "Try talking to me by writing 'self.talk();' and running the code"
            //         ],
            //         [
            //             "WOW You just talked to me!",
            //             "You can also move around using ",
            //         ],
            //         [
            //             "I don't know what to say...",
            //             "There is someone smart enough to talk!",
            //         ],
            //         [
            //             "You are the one!",
            //             "The only person with at least 3 IQ!!!",
            //             "You must be! because you can talk!"
            //         ]
            //     ],
            //     animations:[
            //         new ChainedAnimation(
            //             null,
            //             "idle",
            //             Animation.assets['tutorialguy_idle'],
            //             {x:32, y:32},
            //             1,
            //             -1,
            //             0
            //         )
            //     ]
            // }
        ])
    }

    public static loadNPCs(gameState:GameManager):NPC[]{
        return this.NPCData.map(x => x.loadHandler(gameState, x)).filter(x => x)
    }

    public dialogs:string[][] = []
    public dialogProgress:number = 0
    public dialogIndex:number = -1
    public talkHandler:(self:NPC) => void;

    constructor(
        state:UnitState, 
        name:string, 
        gameState:GameManager, 
        talkHandler:(self:NPC) => void, 
        dialogs:string[][],
        animations:Animation[]
        ){
        super(state, name, gameState, animations)
        this.dialogs = dialogs
        this.talkHandler = talkHandler
    }

    public isStillTalking():boolean{
        return this.dialogIndex == -1
    }

    public talk():void{
        this.talkHandler(this)
    }


}