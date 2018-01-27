export { Sniper }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";

class Sniper extends Actor {

    public Init(Scene: Scene2D, Location: Vertex) {

        super.Init(Scene, Location)

        this.Weapon = new Weapon(Scene, 50, new Projectile(null, 20, 25));

        let Set = new SpriteSet(null, 'walking', [
                '/Resources/Textures/Actors/sniper01_01.png',
                '/Resources/Textures/Actors/sniper01_02.png'
            ])

        Set.Seed = 40;

        this.SpriteSets = [Set];

        this.SetSpriteSet(0);  
    }
}