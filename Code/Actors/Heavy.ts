export { Heavy }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";

class Heavy extends Actor {

    public Init(Scene: Scene2D, Location: Vertex)
    {
        super.Init(Scene, Location)
        this.Speed = 2;
        this.Health = 200;
        this.MaxHealth = 200;
        this.Weapon = new Weapon(Scene, 10, new Projectile(null, 5, 45), '/Resources/Sounds/machinegunshot.wav');
        if(!Heavy.Sets) Heavy.InitSets();
        this.SpriteSets = Heavy.Sets;
        this.SetSpriteSetByName('idle'); 
    }
    private static Sets:Engineer.SpriteSet[];
    private static InitSets()
    {
        let Walking = new SpriteSet(null, 'walking', [
            '/Resources/Textures/Actors/heavy04_01.png',
             //'/Resources/Textures/Actors/heavy04_02.png'
        ])

        Walking.Seed = 5;

        let Idle = new SpriteSet(null, 'idle', [
                '/Resources/Textures/Actors/heavy04_01.png',
            ])
        
        Heavy.Sets = [Walking, Idle];
    }
}