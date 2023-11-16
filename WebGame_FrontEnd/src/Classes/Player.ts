import { Animation } from "./GameObjects/Animation";
import { ChainedAnimation } from "./GameObjects/ChainedAnimation";
import { PlayerUnit } from "./GameObjects/PlayerUnit";

export class Player{
    private gold:number = 0
    public units:PlayerUnit[] = []

    constructor(){
        const p1 = new PlayerUnit({x:0,y:0})
        
        p1.addAnimation(new ChainedAnimation(
            p1,
            "idle",
            Animation.assets['player_idle'],
            {x:32, y:32},
            2,
            -1,
            1
        ))

        p1.createAnimation(
            "walk", 
            Animation.assets['player_walk'],
            {x:32, y:32},
            4,
            "",
            4
        )
        p1.setMoveSpeed(2);

        const p2 = new PlayerUnit({x:0,y:1})
        
        p2.addAnimation(new ChainedAnimation(
            p2,
            "idle",
            Animation.assets['player2_idle'],
            {x:32, y:32},
            2,
            -1,
            1
        ))

        p2.createAnimation(
            "walk", 
            Animation.assets['player2_walk'],
            {x:32, y:32},
            4,
            "",
            4
        )
        p2.setMoveSpeed(1);
        this.units.push(p1)
        this.units.push(p2)
    }
}