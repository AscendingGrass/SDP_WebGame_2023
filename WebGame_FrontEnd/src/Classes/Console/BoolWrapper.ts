import { ExpressionHandler } from "./ExpressionHandler";
import { Wrapper } from "./Wrapper";

export class BoolWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            operator:"",
            arguments:0,
            process:(self:BoolWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            operator:".",
            arguments:1,
            process:(self:BoolWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a boolean");
                }
            }
        },
        {
            operator:"==",
            arguments:1,
            process:(self:BoolWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof BoolWrapper) return new BoolWrapper(self.getValue() == arg.getValue())
                return new BoolWrapper(false)
            }
        },
        {
            operator:"!=",
            arguments:1,
            process:(self:BoolWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof BoolWrapper) return new BoolWrapper(self.getValue() != arg.getValue())
                return new BoolWrapper(true)
            }
        },
        {
            operator:"&&",
            arguments:1,
            process:(self:BoolWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof BoolWrapper) return new BoolWrapper(self.getValue() && arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is not a boolean")
            }
        },
        {
            operator:"||",
            arguments:1,
            process:(self:BoolWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof BoolWrapper) return new BoolWrapper(self.getValue() || arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is not a boolean")
            }
        },
    ]
    constructor(value:boolean){
        super(value);
        this.type = "boolean"
    }

    public processExpression(operator: string, args: Wrapper[]): Wrapper {
        const argCount = args.length
        const expHandler = BoolWrapper.processes.find(x => {
            return x.operator === operator && x.arguments == argCount
        })

        if(!expHandler) throw Error("this operator, '" + operator + "' doesn't exist for boolean")
        return expHandler.process(this, args);
    }

    public getValue():boolean {
        return super.getValue();
    }

    public setValue(value:boolean){
        super.setValue(value);
    }
}