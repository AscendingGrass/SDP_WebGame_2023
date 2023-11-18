import { Wrapper } from "./Wrapper";

export type ExpressionHandler = {
    operator:string;
    arguments:number;
    process: (self:Wrapper, args:Wrapper[]) => Wrapper
}