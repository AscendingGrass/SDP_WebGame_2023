import { Animated } from "./Animated";
import { Animation } from "./Animation";
import { Grid } from "./Grid";
import { Point } from "./Point";
import { Tile } from "./Tile";
import { IHasCoordinate } from "./IHasCoordinate";
import { GameState } from "../States/GameState";

export abstract class Entity extends Animated implements IHasCoordinate{
    protected coordinate:Point
    protected grid:Grid | null = null
    protected gameState:GameState
    private passable:boolean = false
    public holds:Entity|null = null

    constructor(name:string, coordinate:Point, gameState:GameState, animations:Animation[] = []){
        super(name, animations)
        this.coordinate = coordinate
        this.gameState = gameState
    }

    public getPassable():boolean{
        return this.passable
    }

    public setPassable(value:boolean):void{
        if(this.holds === null) this.passable = value
        else throw Error('Entity is holding another entity')
    }

    public getCoordinate():Point{
        return this.coordinate;
    }

    public setCoordinate(value:Point, triggerTile?:boolean):void{
        if(this.grid){
            const row = this.grid.entityGrid[value.y]
            if(!row) {
                throw Error('index out of bounds')
            }

            const entity = row[value.x]
            if(entity === undefined) {
                throw Error('index out of bounds')
            }

            if(entity !== null) {
                let topmost = entity
                while(topmost.holds != null) topmost = topmost.holds
                // throw an error if you can't stack the moving entity into the target position (the topmost entity in the target position is impassable)
                if(!topmost.passable) throw Error('coordinate is not empty')
                topmost.holds = this;
                return;
            }
            else{
                row[value.x] = this;
            }

            let current = this.grid.entityGrid[this.coordinate.y][this.coordinate.x]
            if(current === null) throw Error('Misaligned entity, '+ this.name +' coordinates is not reflected in the grid')
            if(current === this) { // If the moving entity is the bottom most entity
                this.grid.entityGrid[this.coordinate.y][this.coordinate.x] = this.holds
            }
            else { // If the moving entity is on top of another entity
                while(current.holds !== this) { // Find the entity that is right under the moving entity
                    current = current.holds
                    if(current == null) throw Error('Misaligned entity, '+ this.name +' coordinates is not reflected in the grid')
                }
                current.holds = this.holds;
                this.holds = null;
            }
            this.coordinate = value;
            if(triggerTile) this.grid.tiles[value.y][value.x]?.step(this, this.gameState);
            return;
        }
        this.coordinate = value;
    }

    public getTile():Tile|null{
        return this.grid?.tiles[this.coordinate.y][this.coordinate.x] ?? null
    }

    public getNeighbour(offset:Point):Entity|null{
        if(this.grid){
            const x = this.coordinate.x + offset.x
            const y = this.coordinate.y + offset.y

            const row = this.grid.entityGrid[y]
            if(!row) {
                throw Error('index out of bounds')
            }

            const entity = row[x]
            if(entity === undefined) {
                throw Error('index out of bounds')
            }
            return entity
        }
        return null
    }

    public getGrid():Grid|null{
        return this.grid
    }

    public setGrid(grid:Grid|null):void{
        if(this.grid == grid && (grid == null || grid?.entities.includes(this))) return
        if(grid != null){
            if(grid.entityGrid.length <= this.coordinate.y || this.coordinate.y < 0) throw Error("This entity's coordinates are out of bounds for the grid")
            if(grid.entityGrid[0].length <= this.coordinate.x || this.coordinate.x < 0) throw Error("This entity's coordinates are out of bounds for the grid")
        }
        if(this.grid != null) {
            this.grid.removeEntity(this)
        }
        this.grid = grid
        this.grid?.addEntity(this)
    }
}