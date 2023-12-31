import { Animation } from "./Animation";
import { Point } from "./Point";
import { SpriteFrame } from "./SpriteFrame";
import { ChainedAnimation } from "./ChainedAnimation";
import { GroupAnimation } from "./GroupAnimation";

export abstract class Animated{
    protected animations:Animation[];
    protected name:string;

    public currentAnimationIndex:number = 0;

    constructor(name:string, animations:Animation[] = []){
        this.name = name
        this.animations = animations
    }

    public addAnimation(animation: Animation){
        this.animations.push(animation)
    }

    public createAnimation(animationName:string, spriteSheet:HTMLImageElement, spriteResolution:Point, spriteFrameNum:number, nextAnimation:string="", animationSpeed:number=1):void{
        this.animations.push(new ChainedAnimation(
            this,
            animationName,
            spriteSheet,
            spriteResolution,
            spriteFrameNum,
            this.animations.findIndex(x => x.animationName === nextAnimation),
            animationSpeed
        ))
    }

    public getName():string{
        return this.name;
    }

    public getAnimation(animationName:string):Animation|null{
        const index = this.animations.findIndex(x => x.animationName === animationName)
        return index === -1 ? null  : this.animations[index]
    }

    public playAnimation(animationName:string):void{
        this.animations[this.currentAnimationIndex].resetAnimation()
        this.currentAnimationIndex = this.animations.findIndex(x => x.animationName === animationName)
    }

    public playAnimationIndex(animationIndex:number):void{
        this.animations[this.currentAnimationIndex].resetAnimation()
        this.currentAnimationIndex = animationIndex
    }

    public nextFrame(deltaTime:number):void{
        if(this.animations[this.currentAnimationIndex] instanceof GroupAnimation) return;
        this.animations[this.currentAnimationIndex].nextFrame(deltaTime)
    }

    public currentAnimationFrame():SpriteFrame{
        try{

            return this.animations[this.currentAnimationIndex].currentAnimationFrame()
        }
        catch(err){
            console.log(err);
            return this.animations[this.currentAnimationIndex].currentAnimationFrame()
        }
    }

    public getAvailableAnimations(): string[]{
        return this.animations.map(x => {
            return x.animationName
        })
    }
}