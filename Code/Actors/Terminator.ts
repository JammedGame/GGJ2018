export { Terminator }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";
import { SniperBehaviour } from "../SniperBehaviour";

class Terminator extends Actor {

    public Init(Scene: Scene2D, Location: Vertex)
    {
        super.Init(Scene, Location)
        this._Behaviour = new SniperBehaviour(null, this._Scene, this);
        this.Health = 220;
        this.MaxHealth = 220;
        this.Weapon = new Weapon(Scene, 10, new Projectile(null, 5, 10), '/Resources/Sounds/machinegunshot.wav');        if(!Terminator.Sets) Terminator.InitSets();
        this.SpriteSets = Terminator.Sets;
        this.SetSpriteSetByName('idle');  
    }
    private static Sets:Engineer.SpriteSet[];
    private static InitSets()
    {
        let Walking = new SpriteSet(null, 'walking', [
            '/Resources/Textures/Actors/terminator01.png',
        ])

        Walking.Seed = 5;

        let Idle = new SpriteSet(null, 'idle', [
                '/Resources/Textures/Actors/terminator01.png',
            ])
        
            Terminator.Sets = [Walking, Idle];
    }
}