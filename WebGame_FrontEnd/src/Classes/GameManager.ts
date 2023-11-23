import { ChainedAnimation } from './GameObjects/ChainedAnimation';
import { Animation } from './GameObjects/Animation';
import { TerminalView } from './TerminalView';
import { CanvasView } from './CanvasView'
import { Grid } from './GameObjects/Grid'
import { Player } from './Player';
import { Direction } from './GameObjects/Direction';
import { PlayerUnit } from './GameObjects/PlayerUnit';

export class GameManager {
    private lastTimeStamp: number = 0;
    private deltaTime: number = 0;
    private isRunning: boolean = false;
    private animationFrameId: number = -1;
    private player: PlayerUnit = new PlayerUnit({x:0,y:0});
    private terminalView: TerminalView | null = null;
    private grid: Grid = new Grid({ x: 100, y: 100 });
    private canvasView: CanvasView | null = null;

    constructor(canvasView: CanvasView | null = null, terminalView: TerminalView | null = null) {
        this.setCanvasView(canvasView);
        this.setTerminalView(terminalView);
        
        this.player.addAnimation(new ChainedAnimation(
            this.player,
            "idle",
            Animation.assets['player_idle'],
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
        this.player.setMoveSpeed(2);
        this.grid.addEntity(this.player);
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
        this.grid.update(this.deltaTime, {
            position: {
                x: Math.floor(camPos.x - scaledRenderRadius),
                y: Math.floor(camPos.y - scaledRenderRadius),
            },
            size: {
                x: Math.ceil(scaledRenderRadius * 2),
                y: Math.ceil(scaledRenderRadius * 2),
            }
        }, [this.player])
    }

    private render(): void {
        this.canvasView?.render(this.grid)
        // this.canvasView?.getContext()?.fillText("fps : " + (1 / this.deltaTime).toFixed(3), 10, 80)
    }
}