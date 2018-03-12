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
        this._Possesive = false;
        this.Weapon = new Weapon(Scene, 4, new Projectile(null, 12, 40), '/Resources/Sounds/machinegunshot.wav');        if(!Terminator.Sets) Terminator.InitSets();
        this.SpriteSets = Terminator.Sets;
        this.SetSpriteSetByName('idle');  
    }
    private static Sets:Engineer.SpriteSet[];
    private static InitSets()
    {
        let Walking = new SpriteSet(null, [
            'Resources/Textures/Actors/terminator01.png',
        ], 'walking')

        Walking.Seed = 5;

        let Idle = new SpriteSet(null, [
                'Resources/Textures/Actors/terminator01.png',
            ], 'idle')
        
            Terminator.Sets = [Walking, Idle];
    }
}