import { Direction } from "../GameObjects/Direction";
import { InteractableBarrier } from "../GameObjects/InteractableBarrier";
import { NPC } from "../GameObjects/NPC";
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
                    case 'interact()': {
                        const player = self.getValue()
                        let temp;
                        switch(player.getDirection()){
                            case Direction.Up:
                                temp = player.getNeighbour({x:0, y:-1}) 
                                break;
                            case Direction.Down:
                                temp = player.getNeighbour({x:0, y:1}) 
                                break;
                            case Direction.Left:
                                temp = player.getNeighbour({x:-1, y:0}) 
                                break;
                            case Direction.Right:
                                temp = player.getNeighbour({x:1, y:0}) 
                                break;
                            }
                        if(temp instanceof InteractableBarrier){
                            temp.interact(player, player.gameState)
                        }
                        return new VoidWrapper();
                    }
                    case 'talk()': {
                        const player = self.getValue()
                        let temp;
                        switch(player.getDirection()){
                            case Direction.Up:
                                temp = player.getNeighbour({x:0, y:-1}) 
                                break;
                            case Direction.Down:
                                temp = player.getNeighbour({x:0, y:1}) 
                                break;
                            case Direction.Left:
                                temp = player.getNeighbour({x:-1, y:0}) 
                                break;
                            case Direction.Right:
                                temp = player.getNeighbour({x:1, y:0}) 
                                break;
                            }
                        if(temp instanceof NPC){
                            temp.talk()
                        }
                        return new VoidWrapper();
                    }
                    case 'right':
                        try{
                            const player = self.getValue()
                            player.setDirection(Direction.Right);
                            const entityRight = player.getNeighbour({x:1, y:0})
                            return new StringWrapper(entityRight ? entityRight.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'left':
                        try{
                            const player = self.getValue()
                            player.setDirection(Direction.Left);
                            const entityLeft = player.getNeighbour({x:-1, y:0})
                            return new StringWrapper(entityLeft ? entityLeft.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'up':
                        try{
                            const player = self.getValue()
                            player.setDirection(Direction.Up);
                            const entityUp = player.getNeighbour({x:0, y:-1})
                            return new StringWrapper(entityUp ? entityUp.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'down':
                        try{
                            const player = self.getValue()
                            player.setDirection(Direction.Down);
                            const entityDown = player.getNeighbour({x:0, y:1})
                            return new StringWrapper(entityDown ? entityDown.getName() : 'None');
                        }
                        catch(err){
                            return new StringWrapper('Boundary')
                        }
                    case 'ground':{
                        const tile = self.getValue().getTile()
                        return new StringWrapper(tile ? tile.getName() : "None");
                    }
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
                console.log("player move : " + args[1].getValue());
                switch(args[0]?.getValue()){
                    case 'moveUp()':
                        return new WaitWrapper('move up ' + args[1].getValue());
                    case 'moveDown()':
                        return new WaitWrapper('move down ' + args[1].getValue());
                    case 'moveLeft()':
                        return new WaitWrapper('move left ' + args[1].getValue());
                    case 'moveRight()':
                        return new WaitWrapper('move right ' + args[1].getValue());
                    case 'interact()': {
                        const player = self.getValue()
                        const direction = args[1].getValue()
                        let temp;
                        switch(direction){
                            case "up":
                                player.setDirection(Direction.Up)
                                temp = player.getNeighbour({x:0, y:-1}) 
                                break;
                            case "down":
                                player.setDirection(Direction.Down)
                                temp = player.getNeighbour({x:0, y:1}) 
                                break;
                            case "left":
                                player.setDirection(Direction.Left)
                                temp = player.getNeighbour({x:-1, y:0}) 
                                break;
                            case "right":
                                player.setDirection(Direction.Right)
                                temp = player.getNeighbour({x:1, y:0}) 
                                break;
                            default:
                                return new VoidWrapper();
                            }

                        if(temp instanceof InteractableBarrier){
                            temp.interact(player, player.gameState)
                            console.log("passable: " + temp.getPassable());
                        }
                        return new VoidWrapper();
                    }
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