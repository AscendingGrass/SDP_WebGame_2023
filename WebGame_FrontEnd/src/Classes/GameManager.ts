import { ChainedAnimation } from './GameObjects/ChainedAnimation';
import { Animation } from './GameObjects/Animation';
import { TerminalView } from './TerminalView';
import { CanvasView } from './CanvasView'
import { Grid } from './GameObjects/Grid'
import { PlayerUnit } from './GameObjects/PlayerUnit';
import { GameState } from './States/GameState';
import { LogView } from './LogView';
import { PlayerState } from './States/PlayerState';
import { GroupAnimation } from './GameObjects/GroupAnimation';
import { Direction } from './GameObjects/Direction';
import { NPC } from './GameObjects/NPC';

export class GameManager {
    private lastTimeStamp: number = 0;
    private deltaTime: number = 0;
    private isRunning: boolean = false;
    private animationFrameId: number = -1;
    private player: PlayerUnit | null = null;
    private terminalView: TerminalView | null = null;
    private grid: Grid ;
    private canvasView: CanvasView | null = null;
    private logView: LogView | null = null;
    private currentState:GameState |null = null
    private groupAnimations:GroupAnimation[] = []

    constructor(logView: LogView|null = null, canvasView: CanvasView | null = null, terminalView: TerminalView | null = null, gameState:GameState|null = null)  {
        this.setCanvasView(canvasView);
        this.setLogView(logView)
        this.grid = new Grid({ x: 100, y: 100 })
        this.groupAnimations = GroupAnimation.animations.map(x => x.copy())
        this.load(gameState)
        this.setTerminalView(terminalView);

    }

    public save():void{

    }

    public load(gameState:GameState|null = null):void {
        
        
        if(gameState == null){

            const playerState = new PlayerState({x:3,y:3})
            this.currentState = new GameState([], playerState, this.logView as LogView)
            this.player = new PlayerUnit(playerState, this.currentState)
            
            this.player.addAnimation(new ChainedAnimation(
                this.player,
                "idle_down",
                Animation.assets['player_idle_down'],
                {x:32, y:32},
                2,
                -1,
                1
            ))
            this.player.addAnimation(new ChainedAnimation(
                this.player,
                "idle_up",
                Animation.assets['player_idle_up'],
                {x:32, y:32},
                2,
                -1,
                1
            ))
            this.player.addAnimation(new ChainedAnimation(
                this.player,
                "idle_left",
                Animation.assets['player_idle_left'],
                {x:32, y:32},
                2,
                -1,
                1
            ))
            this.player.addAnimation(new ChainedAnimation(
                this.player,
                "idle_right",
                Animation.assets['player_idle_right'],
                {x:32, y:32},
                2,
                -1,
                1
            ))

            this.player.createAnimation(
                "walk", 
                Animation.assets['player_walk'],
                {x:32, y:32},
                4,
                "",
                4
            )
            this.player.setDirection(Direction.Up)
            this.player.setMoveSpeed(2);
            this.grid.addEntity(this.player);
            NPC.loadNPCs(this.currentState).forEach(npc => this.grid.addEntity(npc))
            this.grid.loadBarriers(
                'wwwwwww00\n' +
                'w00000w00\n' +
                'w00000w00\n' +
                'w00000d00\n' +
                'w00000w00\n' +
                'w00000w00\n' +
                'wwwwwww00\n' 
                ,
                this.currentState,
                this.groupAnimations
            )
            this.grid.fill("grass", this.groupAnimations)
            this.grid.loadTiles(
                'fffffff00\n' +
                'fffffff00\n' +
                'fffffff00\n' +
                'fffffff00\n' +
                'fffffff00\n' +
                'fffffff00\n' +
                'fffffff00\n' 
                ,
                this.groupAnimations
            )
        }else{
            this.currentState = gameState
            throw Error("Not Implemented");
        }
    }

    public getDeltatime(): number {
        return this.deltaTime
    }

    public setCanvasView(canvasView: CanvasView | null): void {
        this.canvasView = canvasView
        if(this.canvasView){
            this.canvasView.onClick = (gridCoordinate) => {
                const tile = this.grid.tiles[gridCoordinate.y][gridCoordinate.x]
                tile!.currentAnimationIndex = tile?.currentAnimationIndex == 2 ? Math.round(Math.random()) : 2
            }
        }
    }

    public setLogView(logView: LogView | null): void {
        this.logView = logView
        if(this.currentState && logView) {
            console.log("testetest");
            this.currentState.logs = logView
        }
    }

    public setTerminalView(terminalView: TerminalView | null): void {
        terminalView?.setTerminal(this.player?.terminal ?? null)
        this.terminalView?.setTerminal(null)
        this.terminalView = terminalView
    }

    public start(): void {
        if (this.isRunning) return

        const run = (timestamp: number): void => {
            this.deltaTime = (timestamp - this.lastTimeStamp) / 1000
            this.update()
            this.render()
            this.lastTimeStamp = timestamp
            this.animationFrameId = requestAnimationFrame(run)
        };

        this.animationFrameId = requestAnimationFrame(run)
    }

    public pause(): void {
        if (!this.isRunning) return
        cancelAnimationFrame(this.animationFrameId)
    }

    private update(): void {
        if (!this.canvasView) {
            this.grid.update(this.deltaTime)
            return
        }
        const camPos = this.canvasView.getCameraPosition()
        const scaledRenderRadius = this.canvasView.getScaledRenderRadius()
        this.grid.update(this.getDeltatime(), {
            position: {
                x: Math.floor(camPos.x - scaledRenderRadius),
                y: Math.floor(camPos.y - scaledRenderRadius),
            },
            size: {
                x: Math.ceil(scaledRenderRadius * 2),
                y: Math.ceil(scaledRenderRadius * 2),
            }
        }, [this.player as PlayerUnit])
        this.groupAnimations.forEach(x => {
            x.nextFrame(this.getDeltatime())
        })
    }

    private render(): void {
        this.canvasView?.render(this.grid)
        this.canvasView?.getContext()?.fillText("fps : " + (1 / this.deltaTime).toFixed(3), 10, 80)
    }
}