import { LogView } from "../LogView";
import { EventState } from "./EventState";
import { PlayerState } from "./PlayerState";

export class GameState{
    public playtime:number
    public score:number
    public eventStates:EventState[]
    public playerState:PlayerState
    public logs:LogView

    /**
     *
     */
    constructor(eventStates:EventState[], playerState:PlayerState, logs:LogView, playtime:number = 0, score:number = 0) {
        this.playtime = playtime
        this.score = score
        this.eventStates = eventStates
        this.playerState = playerState
        this.logs = logs
    }

    public update(deltaTime:number){
        this.playtime += deltaTime
        this.eventStates.forEach(eventState => {
            eventState.update(deltaTime, this)
        })
    }

    // public copy():GameState{
        
    // }
}