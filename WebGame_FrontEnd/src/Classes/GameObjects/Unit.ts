import { Animation } from "./Animation";
import { Direction } from "./Direction";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { UnitState } from "../States/UnitState";
import { GameManager } from "../GameManager";

export abstract class Unit extends Entity{
    protected originalCoordinate:Point
    protected isMoving:boolean = false
    protected lerpProgress:number = 0
    protected moveIterationProgress:number = 0
    protected moveIterationTarget:number = 0
    protected unitState:UnitState;

    constructor(state:UnitState, name:string, gameState:GameManager, animations:Animation[]){
        super(name, state.coordinate, gameState, animations)
        this.unitState = state;
        this.originalCoordinate = {...state.coordinate}
        this.setMoveSpeed(state.moveSpeed)
    }

    public getIsMoving():boolean{
        return this.isMoving
    }

    public setMoveSpeed(value:number, animationSpeedMult:number = 1):void{
        this.unitState.moveSpeed = value;
        const animation = this.getAnimation('walk');
        if(!animation) return;
        animation.animationSpeed = animation.spriteFrameNum * animationSpeedMult * this.unitState.moveSpeed
    }

    public setDirection(direction:Direction):void{
        this.unitState.direction = direction;
    }

    public getDirection():Direction{
        return this.unitState.direction;
    }

    public addAnimation(animation: Animation): void {
        super.addAnimation(animation)
        if(animation.animationName === 'walk'){
            this.setMoveSpeed(this.unitState.moveSpeed)
        }
    }

    public createAnimation(animationName: string, spriteSheet: HTMLImageElement, spriteResolution: Point, spriteFrameNum: number, nextAnimation?: string, animationSpeed?: number): void {
        super.createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation, animationSpeed)
        if(animationName === 'walk'){
            this.setMoveSpeed(this.unitState.moveSpeed)
        }
    }

    public update(deltaTime: number): void {
        if(this.isMoving)  this.lerpProgress += deltaTime * this.unitState.moveSpeed
        if(this.lerpProgress >= 1){
            this.moveIterationProgress += 1;
            this.lerpProgress = 0;
            this.originalCoordinate = this.coordinate;
            this.isMoving = false
            if(this.moveIterationProgress < this.moveIterationTarget) {
                this.move(this.unitState.direction)
                return
            }
            this.moveIterationProgress  = 0
            this.moveIterationTarget = 0
            this.playAnimation('idle_down')
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

    public getCoordinate():Point{
        return this.unitState.coordinate;
    }

    public setCoordinate(value:Point, triggerTile?:boolean):void{
        super.setCoordinate(value, triggerTile)
        this.unitState.coordinate = value;
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