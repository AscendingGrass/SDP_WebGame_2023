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

    constructor(name:string, coordinate:Point, gameState:GameState, animations:Animation[] = []){
        super(name, animations)
        this.coordinate = coordinate
        this.gameState = gameState
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
                throw Error('coordinate is not empty')
            }

            this.grid.entityGrid[this.coordinate.y][this.coordinate.x] = null;
            row[value.x] = this;
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