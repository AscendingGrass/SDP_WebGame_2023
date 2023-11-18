import { BoolWrapper } from "./BoolWrapper";
import { ExpressionHandler } from "./ExpressionHandler";
import { NumberWrapper } from "./NumberWrapper";
import { Wrapper } from "./Wrapper";

export class StringWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            operator:"",
            arguments:0,
            process:(self:StringWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            operator:".",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    case 'toNumber()':
                        // eslint-disable-next-line no-case-declarations
                        const val:number = +self.getValue()
                        return new NumberWrapper(val);
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a string");
                }
            }
        },
        {
            operator:"+",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof NumberWrapper) return new StringWrapper(self.getValue() + arg.getValue())
                if(arg instanceof StringWrapper) return new StringWrapper(self.getValue() + arg.getValue())
                throw new Error("you can't add " + self.getValue() + " and " + arg.getValue())
            }
        },
        {
            operator:"==",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof StringWrapper) return new BoolWrapper(self.getValue() == arg.getValue())
                return new BoolWrapper(false)
            }
        },
        {
            operator:"!=",
            arguments:1,
            process:(self:StringWrapper, args:Wrapper[])=>{
                const arg = args[0]
                if(arg instanceof StringWrapper) return new BoolWrapper(self.getValue() != arg.getValue())
                return new BoolWrapper(true)
            }
        },
    ]

    constructor(value:string){
        super(value);
        this.type="string"
    }

    public processExpression(operator: string, args: Wrapper[]): Wrapper {
        const argCount =  args.length
        const expHandler = StringWrapper.processes.find(x => {
            return x.operator === operator && x.arguments == argCount
        })

        if(!expHandler) throw Error("this operator, '" + operator + "' doesn't exist for string")
        return expHandler.process(this, args);
    }

    public getValue():string {
        return super.getValue();
    }

    public setValue(value:string){
        super.setValue(value);
    }
}