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
                        Event.start(self.gameState,"TUT001")
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
                        case 4:
                            self.dialogIndex = 3
                            break;
                        case 5:
                            self.dialogIndex = 4
                            eventState?.progress("walk_complete_1", self.gameState, [self])
                            break;
                        case 6: // walk test failed
                            self.dialogIndex = 5
                            break;
                        case 7: // walk test success
                            self.dialogIndex = 6
                            eventState?.progress("exit", self.gameState)
                            break;
                        case 8: // still in house
                            self.dialogIndex = 7
                            break;
                        case 9: // went back to the house
                            self.dialogIndex = 8
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
                    self.gameState?.logView?.writeSeparator()
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
                    const event = gameState.events.find(x => x.getId() === "TUT001")
                    if(!event){
                        Event.start(gameState,"TUT001")
                        newNPC.talk();
                    }
                    
                    return newNPC
                    
                },
                dialogs:[
                    [ // 0
                        "Hello!",
                        "I'm the tutorial guy.",
                        "Try talking to me by writing 'self.talk();' and running the code"
                    ],
                    [  // 1
                        "WOW You just talked to me!",
                        "You can also move to the right using 'self.moveRight();'",
                        "Try moving to the marked floor to your right!'",
                    ],
                    [ // 2
                        "Now try to move to the marked floor down there!",
                        "You can do it by writing \n self.moveDown(2); \n self.moveLeft();",
                        "The number you put in the parenthesis is the number of steps you want to walk!"
                    ],
                    [ // 3
                        "you did well!",
                        "Now go back here and talk to me!",
                        "You can do it by writing \n self.moveUp(2); \n self.talk();"
                    ],
                    [ // 4
                        "For your last tutorial on movement, I want you to step on all the marked floors by just running the whole movement sequence at once",
                        "If you fail to do it, all the marks will show up again",
                        "You can't press the start button more than once to run multiple codes",
                        "You need to do it in one go",
                        "Don't forget to end each line of code with a semi colon (;)",
                    ],
                    [ // 5
                        "You're 3 IQ, and your braincells are leaking...",
                        "Try again",
                    ],
                    [ // 6
                        "Pretty easy isn't it?",
                        "You have mastered the legendary arts of moving!",
                        "Now go out brat! this is my house!",
                        "Move to the door and write \n self.right; \n self.interact();",
                        "use self.right; self.left; self.up; self.down; to look around",
                        "and self.interact(); to interact with things in front of you",
                        "Now that you know all this, GET OUT!",
                        "oh, and don't forget to close the door, you won't get any score if you leave the door open"
                    ],
                    [ // 7
                        "GO OUT AND CLOSE THE DOOR!"
                    ],
                    [ // 8
                        "WHY ARE YOU HERE AGAIN!?"
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
            {
                name:"Bob",
                talkHandler:(self:NPC)=>{
                    const gameState = self.gameState

                    let eventState = gameState?.events.find(x => x.getId() === "CMP001")
                    if(!eventState) {
                        eventState = Event.start(self.gameState,"CMP001")
                    }

                    switch(eventState?.getValueOf("progress")){
                        case 0:
                            self.dialogIndex = 0
                            eventState?.progress("start", self.gameState)
                            break;
                        case 1:
                            self.dialogIndex = 1
                            break;
                        case 2:
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
                    self.gameState?.logView?.writeSeparator()
                    self.dialogProgress = 0
                    self.dialogIndex = -1
                },
                // LOAD HANDLER
                loadHandler: (gameState:GameManager, data:NPCData)=>{
                    const spawn:Point = {x:8, y:10}
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
                    
                    return newNPC
                },
                dialogs:[
                    [ // 0
                        "Hello!",
                        "Can you go to the next room?",
                    ],
                    [ // 1
                        "Go to the next room and stand on the floor marked!",
                    ],
                    [ // 2
                        "Thank you for your help, if you wonder what that was for... it wasn't for anything!",
                    ],
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
            {
                name:"Ruben of the IFJ",
                talkHandler:(self:NPC)=>{
                    const gameState = self.gameState

                    let eventState = gameState?.events.find(x => x.getId() === "CMP002")
                    if(!eventState) {
                        eventState = Event.start(self.gameState,"CMP002")
                    }

                    switch(eventState?.getValueOf("progress")){
                        case 0:
                            self.dialogIndex = 0
                            eventState?.progress("start", self.gameState)
                            break;
                        case 1:
                            self.dialogIndex = 1
                            break;
                        case 2:
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
                    self.gameState?.logView?.writeSeparator()
                    self.dialogProgress = 0
                    self.dialogIndex = -1
                },
                // LOAD HANDLER
                loadHandler: (gameState:GameManager, data:NPCData)=>{
                    const spawn:Point = {x:13, y:10}
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
                    
                    return newNPC
                },
                dialogs:[
                    [ // 0
                        "Step to your left!",
                    ],
                    [ // 1
                        "Just step to the tile with the x mark!",
                    ],
                    [ // 2
                        "ez clap",
                    ],
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