import { BoolWrapper } from "./BoolWrapper";
import { ExpressionHandler } from "./ExpressionHandler";
import { StringWrapper } from "./StringWrapper";
import { Wrapper } from "./Wrapper";

export class NumberWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            operator:"",
            arguments:0,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            operator:".",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                switch(args[0].getValue()){
                    case 'toString()':
                        return new StringWrapper(self.getValue().toString());
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a number");
                }
            }
        },
        {
            operator:"+",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof StringWrapper) return new StringWrapper(self.getValue() + arg.getValue())
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() + arg.getValue())
                throw new Error("you can't add " + self.getValue() + " and " + arg.getValue())
            }
        },
        {
            operator:"-",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() - arg.getValue())
                throw new Error("you can't subtract " + self.getValue() + " by " + arg.getValue())
            }
        },
        {
            operator:"*",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() * arg.getValue())
                throw new Error("you can't multiply " + self.getValue() + " with " + arg.getValue())
            }
        },
        {
            operator:"/",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() / arg.getValue())
                throw new Error("you can't divide " + self.getValue() + " by " + arg.getValue())
            }
        },
        {
            operator:"%",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new NumberWrapper(self.getValue() % arg.getValue())
                throw new Error("you can't mod " + self.getValue() + " by " + arg.getValue())
            }
        },
        {
            operator:"==",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() == arg.getValue())
                return new BoolWrapper(false)
            }
        },
        {
            operator:"!=",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() != arg.getValue())
                return new BoolWrapper(true)
            }
        },
        {
            operator:"<=",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() <= arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
        {
            operator:">=",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() >= arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
        {
            operator:"<",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() < arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
        {
            operator:">",
            arguments:1,
            process:(self:NumberWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new BoolWrapper(self.getValue() > arg.getValue())
                throw new Error("you can't compare " + self.getValue() + " with " + arg.getValue() + " because " + arg.getValue() + " is a string")
            }
        },
    ]

    constructor(value:number){
        super(value);
        this.type="number"
    }

    public processExpression(operator: string, args: Wrapper[]): Wrapper {
        const argCount = args.length
        const expHandler = NumberWrapper.processes.find(x => {
            return x.operator === operator && x.arguments == argCount
        })

        if(!expHandler) throw Error("this operator, '" + operator + "' doesn't exist for number")
        return expHandler.process(this, args);
    }

    public getValue():number {
        return super.getValue();
    }

    public setValue(value:number){
        super.setValue(value);
    }
}