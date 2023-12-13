import { Animation } from "./Animation";
import { GameState } from "../States/GameState";
import { UnitState } from "../States/UnitState";
import { Unit } from "./Unit";
import { NPCData } from "./NPCData";
import { Point } from "./Point";

export class NPC extends Unit{
    public static NPCData:NPCData[] = [
        {
            name:"Tutorial Guy",
            talkHandler:(self:NPC)=>{
                const eventState = self.gameState.eventStates[0]
                eventState.update
            },
            // LOAD HANDLER
            loadHandler: (gameState:GameState, data:NPCData)=>{

                const spawn:Point = {x:2, y:2}
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
                [
                    "Hello!",
                    "I'm a tutorial guy.",
                    "You can move right by writing self.moveRight(); and running the code",
                    "You can move up by writing self.moveUp(); and running the code",
                    "you can do the same for moving left and down",
                ]
            ],
            animations:[]
        }
    ]

    public static loadNPCs(gameState:GameState):NPC[]{
        return this.NPCData.map(x => x.loadHandler(gameState, x)).filter(x => x)
    }

    public dialogs:string[][] = []
    public dialogProgress:number = 0
    public dialogIndex:number = -1
    public talkHandler:(self:NPC) => void;

    constructor(
        state:UnitState, 
        name:string, 
        gameState:GameState, 
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