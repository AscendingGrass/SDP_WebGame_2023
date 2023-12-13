import { Animation } from "./Classes/GameObjects/Animation"
import { _initializeBarrierVariants } from "./Classes/GameObjects/BarrierVariants"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"
import { NPC } from "./Classes/GameObjects/NPC"
import { Tile } from "./Classes/GameObjects/Tile"

export default function loadAsset():void{

    const grass = new Image()
    grass.src = "./Assets/Prototype/itland_ptype_grasstile.png"
    const redgrass = new Image()
    redgrass.src = "./Assets/Prototype/itland_ptype_redgrasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./Assets/Prototype/itland_ptype_flowergrasstile.png"
    const player_idle_up = new Image()
    player_idle_up.src = "./Assets/Prototype/itland_ptype_player_idle_up.png"
    const player_idle_down = new Image()
    player_idle_down.src = "./Assets/Prototype/itland_ptype_player_idle_down.png"
    const player_idle_left = new Image()
    player_idle_left.src = "./Assets/Prototype/itland_ptype_player_idle_left.png"
    const player_idle_right = new Image()
    player_idle_right.src = "./Assets/Prototype/itland_ptype_player_idle_right.png"
    const player_walk = new Image()
    player_walk.src = "./Assets/Prototype/itland_ptype_player_walk.png"
    const player2_idle = new Image()
    player2_idle.src = "./Assets/Prototype/itland_ptype_player2_idle.png"
    const player2_walk = new Image()
    player2_walk.src = "./Assets/Prototype/itland_ptype_player2_walk.png"
    const tutorialguy_idle = new Image()
    tutorialguy_idle.src = "./Assets/SDP_tutorialguy_idle.png"
    const door_closed = new Image()
    door_closed.src = "./Assets/SDP_door_close.png"
    const door_opened = new Image()
    door_opened.src = "./Assets/SDP_door_open.png"
    const floor = new Image()
    floor.src = "./Assets/SDP_floor.png"
    const wall = new Image()
    wall.src = "./Assets/SDP_wall.png"

    Animation.assets['grass_tile'] = grass
    Animation.assets['red_grass_tile'] = redgrass
    Animation.assets['flowery_grass_tile'] = flowergrass
    Animation.assets['player_idle_up'] = player_idle_up
    Animation.assets['player_idle_down'] = player_idle_down
    Animation.assets['player_idle_left'] = player_idle_left
    Animation.assets['player_idle_right'] = player_idle_right
    Animation.assets['player_walk'] = player_walk
    Animation.assets['player2_idle'] = player2_idle
    Animation.assets['player2_walk'] = player2_walk
    Animation.assets['tutorialguy_idle'] = tutorialguy_idle
    Animation.assets['door_closed'] = door_closed
    Animation.assets['door_opened'] = door_opened
    Animation.assets['floor'] = floor
    Animation.assets['wall'] = wall

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
        new GroupAnimation(
            "floor", 
            floor,
            {x:32, y:32},
            1,
            0
        ),
        new GroupAnimation(
            "wall", 
            wall,
            {x:32, y:32},
            1,
            0
        ),
    )

    Tile._initialize()
    NPC._initialize()
    _initializeBarrierVariants()
}