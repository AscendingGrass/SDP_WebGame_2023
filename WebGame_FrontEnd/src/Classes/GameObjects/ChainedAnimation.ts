import { Animated } from "./Animated";
import { Point } from "./Point";
import { SpriteFrame } from "./SpriteFrame";
import { Animation } from "./Animation";

export class ChainedAnimation extends Animation{
    
    public owner: Animated|null;
    public readonly nextAnimationIndex: number;

    constructor(
        owner: Animated|null,
        animationName: string,
        spriteSheet: HTMLImageElement,
        spriteResolution: Point,
        spriteFrameNum: number,
        nextAnimationIndex: number = -1, // -1 will make this loop indefinitely
        animationSpeed: number = 1 // 0 will make this a static sprite (no animation)
    ) {
        super(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed)
        this.owner = owner;
        this.nextAnimationIndex = nextAnimationIndex;
    }

    public setOwner(value:Animated|null):void{
        this.owner = value
    }

    public nextFrame(deltaTime: number):void{
        this.animationProgress += deltaTime * this.animationSpeed
        if(this.nextAnimationIndex == -1){
            this.animationProgress %= this.spriteFrameNum
        }
        else if(this.animationProgress >= this.spriteFrameNum){
            this.resetAnimation()
            if(this.owner) this.owner.currentAnimationIndex = this.nextAnimationIndex
        }
    }

    public currentAnimationFrame():SpriteFrame{
        const sx:number = this.spriteResolution.x * Math.floor(this.animationProgress)
        return {
            spriteSheet: this.spriteSheet,
            position: {x:sx, y:0},
            resolution: this.spriteResolution
        }
    }

    public copy(newOwner:Animated):ChainedAnimation{
        return new ChainedAnimation(newOwner, this.animationName, this.spriteSheet, this.spriteResolution, this.spriteFrameNum, this.nextAnimationIndex, this.animationSpeed)
    
    }
}