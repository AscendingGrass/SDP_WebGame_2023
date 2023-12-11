import { IDamaging } from "./IDamaging";

export interface IDamagable{
    damage(source:IDamaging):void
    setHealth(value:number):void
    setMaxHealth(value:number):void
    getHealth():number
    getMaxHealth():number
}