import { Animation } from "./Classes/GameObjects/Animation"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"

export default function loadAsset():void{

    const grass = new Image()
    grass.src = "./Assets/Prototype/itland_ptype_grasstile.png"
    const redgrass = new Image()
    redgrass.src = "./Assets/Prototype/itland_ptype_redgrasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./Assets/Prototype/itland_ptype_flowergrasstile.png"
    const player_idle = new Image()
    player_idle.src = "./Assets/Prototype/itland_ptype_player_idle.png"
    const player_walk = new Image()
    player_walk.src = "./Assets/Prototype/itland_ptype_player_walk.png"
    const player2_idle = new Image()
    player2_idle.src = "./Assets/Prototype/itland_ptype_player2_idle.png"
    const player2_walk = new Image()
    player2_walk.src = "./Assets/Prototype/itland_ptype_player2_walk.png"

    Animation.assets['grass_tile'] = grass
    Animation.assets['red_grass_tile'] = redgrass
    Animation.assets['flowery_grass_tile'] = flowergrass
    Animation.assets['player_idle'] = player_idle
    Animation.assets['player_walk'] = player_walk
    Animation.assets['player2_idle'] = player2_idle
    Animation.assets['player2_walk'] = player2_walk

    GroupAnimation.animations.push(
        new GroupAnimation(
            "grass_tile", 
            grass,
            {x:32, y:32},
            1,
            0
        ),
        new GroupAnimation(
            "flowery_grass_tile", 
            flowergrass,
            {x:32, y:32},
            2,
            1
        ),
        new GroupAnimation(
            "red_grass_tile", 
            redgrass,
            {x:32, y:32},
            1,
            0
        ),
    )
}