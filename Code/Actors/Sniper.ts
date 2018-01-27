export { Sniper }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";

class Sniper extends Actor {

    public Init(Scene: Scene2D, Location: Vertex) {

        super.Init(Scene, Location)

        this.Weapon = new Weapon(Scene, 50, new Projectile(null, 5, 100));

        let Walking = new SpriteSet(null, 'walking', [
                '/Resources/Textures/Actors/sniper01_01.png',
                 '/Resources/Textures/Actors/sniper01_02.png'
            ])

        Walking.Seed = 40;

        let Idle = new SpriteSet(null, 'idle', [
                '/Resources/Textures/Actors/sniper01_01.png',
            ])
        
        this.SpriteSets = [Walking, Idle];

        this.SetSpriteSetByName('idle');  
    }
}