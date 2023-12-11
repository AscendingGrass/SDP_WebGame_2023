import { SingleCommand } from "../Console/SingleCommand";
import { Terminal } from "../Console/Terminal";
import { Inventory } from "../Items/Inventory";
import { Animation } from "./Animation";
import { Direction } from "./Direction";
import { Point } from "./Point";
import { Unit } from "./Unit";
import { GameState } from "../States/GameState";
import { PlayerState } from "../States/PlayerState";

export class PlayerUnit extends Unit{
    private playerState:PlayerState
    public terminal:Terminal;
    public inventory:Inventory = new Inventory()

    constructor(playerState:PlayerState, gameState:GameState,animations:Animation[]=[]){
        super(playerState, "PlayerUnit", gameState, animations);
        this.terminal = new Terminal(this)
        this.playerState = playerState
    }


    public update(deltaTime: number): void {
        if(this.terminal.running) {
            try{
                this.terminal.currentCommand?.Execute()
            }
            catch(err){
                console.log('Runtime ' + err)
                this.terminal.stop()
            }
        }
        let currentCommand = this.terminal.currentCommand
        
        if(currentCommand instanceof SingleCommand){
            const asyncTask = currentCommand.getAsyncTask()
            if(asyncTask && this.terminal.running){
                const taskDetail = asyncTask.split(' ')
                if(taskDetail[0] === 'move'){
                    switch(taskDetail[1]){
                        case 'up':
                            this.direction = Direction.Up;
                            break;
                        case 'down':
                            this.direction = Direction.Down;
                            break;
                        case 'left':
                            this.direction = Direction.Left;
                            break;
                        case 'right':
                            this.direction = Direction.Right;
                            break;
                        default:
                            this.direction = Direction.None;
                            break;
                    }
                    this.moveIterationTarget = Number.parseInt(taskDetail[2])
                    if(!this.isMoving)this.move(this.direction)
                }
            }
            if(this.isMoving)  this.lerpProgress += deltaTime * this.playerState.moveSpeed
            if(this.lerpProgress >= 1){
                this.moveIterationProgress += 1;
                this.lerpProgress = 0;
                this.originalCoordinate = this.coordinate;
                this.isMoving = false
                if(this.moveIterationProgress < this.moveIterationTarget) {
                    if(!this.terminal.running){
                        this.moveIterationProgress  = 0
                        this.moveIterationTarget = 0
                        this.playAnimation('idle')
                        return
                    }
                    this.move(this.direction)
                    return
                }
                this.moveIterationProgress  = 0
                this.moveIterationTarget = 0
                currentCommand = currentCommand.jumpNextCommand()
                try{
                    currentCommand.Execute()
                }
                catch(err){
                    console.log('Runtime ' + err)
                    this.terminal.stop()
                }
                if(!(currentCommand instanceof SingleCommand) || !(currentCommand.getAsyncTask()?.startsWith('move '))){
                    this.playAnimation('idle')
                }
            }
        }
    }

    public getSpriteCoordinate(): Point {
        if(!this.isMoving) return this.coordinate;
        const coordDiff:Point = {
            x: this.originalCoordinate.x - this.coordinate.x,
            y: this.originalCoordinate.y - this.coordinate.y,
        }

        return {
            x: this.originalCoordinate.x - coordDiff.x * this.lerpProgress,
            y: this.originalCoordinate.y - coordDiff.y * this.lerpProgress,
        }
    }

    public move(direction: Direction):void{
        if(this.isMoving || direction == Direction.None) return;
        this.isMoving = true;
        this.playAnimation('walk')
        const nextCoord:Point = {...this.coordinate};
        switch (direction) {
            case Direction.Up:
                nextCoord.y -= 1;
                break;
            case Direction.Down:
                nextCoord.y += 1;
                break;
            case Direction.Left:
                nextCoord.x -= 1;
                break;
            case Direction.Right:
                nextCoord.x += 1;
                break;
            default:
                break;
        }

        try{
            this.setCoordinate(nextCoord, true)
        }
        catch(err){
            return
        }
    }
}