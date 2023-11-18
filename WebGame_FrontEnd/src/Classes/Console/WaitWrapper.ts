import { VoidWrapper } from "./VoidWrapper";

export class WaitWrapper extends VoidWrapper{

    public readonly command:string;

    constructor(command:string){
        super()
        this.type = "wait"
        this.command = command;
    }
}