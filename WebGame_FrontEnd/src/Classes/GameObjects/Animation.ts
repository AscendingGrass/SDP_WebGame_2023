import { Animated } from "./Animated";
import { Point } from "./Point";
import { SpriteFrame } from "./SpriteFrame";
import { ChainedAnimation } from "./ChainedAnimation";

export abstract class Animation{
    public static assets:{[key:string]:HTMLImageElement} = {};

    public static makeCopyIfChained:(animations:Animation[], newOwner:Animated)=>Animation[] = (animations:Animation[], newOwner:Animated)=>{
        return animations.map((x)=>{
          return x instanceof ChainedAnimation ? x.copy(newOwner) : x
        })
    }

    public animationProgress: number = 0;
    
    public readonly animationName: string;
    public readonly spriteSheet: HTMLImageElement;
    public readonly spriteResolution: Point;
    public readonly spriteFrameNum: number;
    public animationSpeed: number;

    constructor(
        animationName: string,
        spriteSheet: HTMLImageElement,
        spriteResolution: Point,
        spriteFrameNum: number,
        animationSpeed: number = 1 // 0 will make this a static sprite (no animation)
    ) {
        this.animationName = animationName;
        this.spriteSheet = spriteSheet;
        this.spriteResolution = spriteResolution;
        this.spriteFrameNum = spriteFrameNum;
        this.animationSpeed = animationSpeed;
    }

    public resetAnimation():void{
        this.animationProgress = 0
    }

    public nextFrame(deltaTime: number):void{
        this.animationProgress += deltaTime * this.animationSpeed
        this.animationProgress %= this.spriteFrameNum
    }

    public currentAnimationFrame():SpriteFrame{
        const sx:number = this.spriteResolution.x * Math.floor(this.animationProgress)
        return {
            spriteSheet: this.spriteSheet,
            position: {x:sx, y:0},
            resolution: this.spriteResolution
        }
    }
}