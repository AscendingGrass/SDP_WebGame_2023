import { Terminal } from "./Terminal";
import { VoidWrapper } from "./VoidWrapper";
import { Wrapper } from "./Wrapper";

export class Expression{
    private terminal:Terminal
    private first:Expression|Wrapper|string|null
    private operator:string|null
    private args:(Expression|Wrapper|string)[]|null

    constructor(terminal:Terminal, operator:string|null = null, first:Expression|Wrapper|string|null = null, args:(Expression|Wrapper|string)[]|null = null){
        this.terminal = terminal
        this.first = first
        this.operator = operator
        this.args = args
    }

    public setFirst(value:Expression|Wrapper|string|null):void{
        this.first = value
    }

    public getFirst():Expression|Wrapper|string|null{
        return this.first
    }

    public setArgs(value:(Expression|Wrapper|string)[]|null):void{
        this.args = value
    }

    public addArg(value:Expression|Wrapper|string):void{
        if(this.args == null) this.args = []
        this.args.push(value)
    }

    public getArgs():(Expression|Wrapper|string)[]|null{
        return this.args
    }

    public setOperator(value:string|null):void{
        this.operator = value
    }

    public isSelfExpression():boolean{
        return this.operator == null && this.args == null && this.first != null
    }

    public getResult(): Wrapper {
        if(this.first == null) throw Error('something went wrong with the expression, the first is null')

        let first;
        try{
            first = this.first instanceof Wrapper ? 
                this.first : 
                this.first instanceof Expression ? 
                    this.first.getResult() : 
                    this.terminal.getVariable(this.first)
            ;
    
            if(this.operator == null && this.args == null){
                return first;
            } 
        }
        catch(err){
            if(this.first !== '@g') throw err;
            // console.log('error passed');
        }

        if(this.args == null || this.operator == null) throw Error('something went wrong with the expression, the args or the operator is null')
        if(this.first instanceof VoidWrapper) throw Error('there is something wrong with your code, this.first returns void')

        const args:Wrapper[] = []
        for (let index = 0; index < this.args.length; index++) {
            const item = this.args[index]
            args[index] =  item instanceof Wrapper ? 
                item : 
                item instanceof Expression ?
                    item.getResult(): 
                    this.terminal.getVariable(item)
            ;

            if(args[index] instanceof VoidWrapper) throw Error('there is something wrong with your code')
        }

        // accessing global function
        if(this.first === '@g'){
            return this.terminal.processGlobalExpression(this.operator, args);
            // const argCount = args.length
            // const expHandler = this.terminal.globalExpressionHandlers.find(x => {
            //     return x.operator === this.operator && x.arguments == argCount
            // })

            // if(!expHandler) throw Error('something is wrong with what you wrote')
            // return expHandler.process(new VoidWrapper(), args);
        }

        return first!.processExpression(this.operator, args)
    }
    
} 