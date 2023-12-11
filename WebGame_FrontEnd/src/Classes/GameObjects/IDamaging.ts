import { IDamagable } from "./IDamagable";

export interface IDamaging{
    damage(target: IDamagable): void;
}