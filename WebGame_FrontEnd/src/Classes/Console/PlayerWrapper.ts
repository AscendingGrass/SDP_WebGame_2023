import { PlayerUnit } from "../GameObjects/PlayerUnit";
import { ExpressionHandler } from "./ExpressionHandler";
import { NumberWrapper } from "./NumberWrapper";
import { StringWrapper } from "./StringWrapper";
import { VoidWrapper } from "./VoidWrapper";
import { WaitWrapper } from "./WaitWrapper";
import { Wrapper } from "./Wrapper";

export class PlayerWrapper extends Wrapper{
    static processes:ExpressionHandler[] = [
        {
            operator:"",
            arguments:0,
            process:(self:PlayerWrapper, args:Wrapper[])=>{
                return self;
            }
        },
        {
            operator:".",
            arguments:1,
            process:(self:PlayerWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    case 'moveUp()':
                        return new WaitWrapper('move up 1');
                    case 'moveDown()':
                        return new WaitWrapper('move down 1');
                    case 'moveLeft()':
                        return new WaitWrapper('move left 1');
                    case 'moveRight()':
                        return new WaitWrapper('move right 1');
                    case 'right':
                        try{
                            const entityRight = self.getValue().getNeighbour({x:1, y:0})
                            return new StringWrapper(entityRight ? entityRight.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'left':
                        try{
                            const entityLeft = self.getValue().getNeighbour({x:-1, y:0})
                            return new StringWrapper(entityLeft ? entityLeft.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'up':
                        try{
                            const entityUp = self.getValue().getNeighbour({x:0, y:-1})
                            return new StringWrapper(entityUp ? entityUp.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'down':
                        try{
                            const entityDown = self.getValue().getNeighbour({x:0, y:1})
                            return new StringWrapper(entityDown ? entityDown.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'ground':
                        const tile = self.getValue().getTile()
                        return new StringWrapper(tile ? tile.getName() : "None");
                    case 'x':
                        return new NumberWrapper(self.getValue().getCoordinate().x);
                    case 'y':
                        return new NumberWrapper(self.getValue().getCoordinate().y);
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a player unit");
                }
            }
        },
        {
            operator:".",
            arguments:2,
            process:(self:PlayerWrapper, args:Wrapper[])=>{
                switch(args[0]?.getValue()){
                    case 'moveUp()':
                        return new WaitWrapper('move up ' + args[1].getValue());
                    case 'moveDown()':
                        return new WaitWrapper('move down ' + args[1].getValue());
                    case 'moveLeft()':
                        return new WaitWrapper('move left ' + args[1].getValue());
                    case 'moveRight()':
                        return new WaitWrapper('move right ' + args[1].getValue());
                    case 'setMoveSpeed()':
                        self.getValue().setMoveSpeed(args[1].getValue())
                        return new VoidWrapper();
                    default:
                        throw Error("this method / property, '" + args[0].getValue() + "' doesn't exist in a player unit");
                }
            }
        },
        
    ]

    constructor(value:PlayerUnit){
        super(value);
        this.type ="playerUnit"
    }

    public processExpression(operator:string, args:Wrapper[]):Wrapper{
        const argCount = args.length
        const expHandler = PlayerWrapper.processes.find(x => {
            return x.operator === operator && x.arguments == argCount
        })

        if(!expHandler) throw Error('something is wrong with what you wrote')
        return expHandler.process(this, args);
    }

    public getValue():PlayerUnit {
        return super.getValue();
    }

    public setValue(value:PlayerUnit){
        super.setValue(value);
    }
}