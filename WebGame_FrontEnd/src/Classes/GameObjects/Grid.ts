import { Entity } from "./Entity";
import { Tile } from "./Tile";
import { Point } from "./Point";
import { Animated } from "./Animated";
import { PlayerUnit } from "./PlayerUnit";
import { GroupAnimation } from "./GroupAnimation";
import { Barrier } from "./Barrier";
import { generateBarrier } from "./BarrierVariants";
import { GameManager } from "../GameManager";

export class Grid{
    public readonly size:Point
    public entities: Entity[]
    public entityGrid: (Entity|null)[][]
    public tiles: (Tile|null)[][]

    constructor(size:Point){
        this.size = size
        this.entities = []
        this.entityGrid = []
        this.tiles = []
        for (let i = 0; i < size.y; i++) {
            this.entityGrid.push([])
            this.tiles.push([])
            for (let j = 0; j < size.x; j++) {
                this.entityGrid[i].push(null)
                this.tiles[i].push(null)
            }
        }
    }

    public fill(tileName:string, groupAnimation:GroupAnimation[]){
        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                this.tiles[i][j] = Tile.generate(tileName, {x:j, y:i}, groupAnimation)
            }
        }
    }

    public loadBarriers(barrierMap:string, gameState:GameManager, groupAnimations:GroupAnimation[]){
        const barrierMapArr = barrierMap.split('\n')
        for (let i = 0; i < barrierMapArr.length; i++) {
            for (let j = 0; j < barrierMapArr[i].length; j++) {
                if(barrierMapArr[i][j] != '0'){
                    this.addEntity(generateBarrier(Barrier.variantAlias[barrierMapArr[i][j]], {x:j, y:i}, gameState, groupAnimations))
                }
            }
        }
    }


    public loadTiles(tileMap:string, groupAnimations:GroupAnimation[]){
        const tileMapArr = tileMap.split('\n')
        for (let i = 0; i < tileMapArr.length; i++) {
            for (let j = 0; j < tileMapArr[i].length; j++) {
                if(tileMapArr[i][j] != '0'){
                    this.tiles[i][j] = Tile.generate(Tile.variantAlias[tileMapArr[i][j]], {x:j, y:i}, groupAnimations)
                }
            }
        }
    }

    public setTile(coordinate:Point, tile:string, groupAnimations:GroupAnimation[]): Tile{
        const temp =  Tile.generate(tile, coordinate, groupAnimations)
        this.tiles[coordinate.y][coordinate.x] = temp
        return temp
    }

    public update(deltaTime:number, updateArea:{position:Point, size:Point} | null = null, prioritizedUpdate:Animated[] = []):void{
        if(!updateArea){
            for(let i = 0; i < this.size.y; ++i){
                for(let j = 0; j < this.size.x; ++j){
                    this.tiles[i]?.at(j)?.nextFrame(deltaTime)
                    let entity:Entity|null = this.entityGrid[i]?.at(j)
                    while(entity){
                        entity.nextFrame(deltaTime)
                        entity = entity.holds
                    }
                }
            }
            return;
        }

        const xStart = updateArea.position.x
        const xEnd   = updateArea.position.x + updateArea.size.x

        const yStart = updateArea.position.y
        const yEnd   = updateArea.position.y + updateArea.size.y

        for(let i = yStart; i < yEnd; ++i){
            for(let j = xStart; j < xEnd; ++j){
                if(j < 0) continue;
                const tile = this.tiles[i]?.at(j)
                let entity:Entity|null = this.entityGrid[i]?.at(j)
                if(tile && !prioritizedUpdate.includes(tile))
                    tile.nextFrame(deltaTime)
                while(entity){
                    if(!prioritizedUpdate.includes(entity)){
                        if(entity instanceof PlayerUnit) entity.update(deltaTime);
                        entity.nextFrame(deltaTime)
                    }
                    entity = entity.holds
                }
            }
        }

        prioritizedUpdate.forEach(x => {
            if(x instanceof PlayerUnit) x.update(deltaTime);
            x.nextFrame(deltaTime)
        })
    }

    public addEntity(entity:Entity):void{
        const index = this.entities.indexOf(entity)
        if(index != -1) {
            if(entity.getGrid() != this) entity.setGrid(this)
            return
        }
        if(this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] != null){
            console.log("coordinate is taken error, entity: ");
            console.log(this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x]);
            throw Error("This coordinate is taken")
        }
        this.entities.push(entity)
        this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = entity
        if(entity.getGrid() != this) entity.setGrid(this)
    }

    public removeEntity(entity:Entity):void{
        const index = this.entities.indexOf(entity)
        if(index != -1){
            this.entities.splice(index, 1)
            this.entityGrid[entity.getCoordinate().y][entity.getCoordinate().x] = null
        }
        if(entity.getGrid() == this){
            entity.setGrid(null)
        }
    }

}