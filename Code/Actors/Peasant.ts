export { Peasant }

import * as TBX from "toybox-engine";

import { Actor } from "../Actor";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";
import { SniperBehaviour } from "../SniperBehaviour";

class Peasant extends Actor {

    public Init(Scene: TBX.Scene2D, Location: TBX.Vertex)
    {
        super.Init(Scene, Location)
        this._Behaviour = new SniperBehaviour(null, this._Scene, this);
        this.Health = 20;
        this.MaxHealth = 20;
        this.Weapon = new Weapon(Scene, 50, new Projectile(null, 12, 100, 1), 'Resources/Sounds/sniper_shot.wav');
        if(!Peasant.Sets) Peasant.InitSets();
        this.SpriteSets = Peasant.Sets;
        this.SetSpriteSetByName('idle');  
    }
    private static Sets:TBX.SpriteSet[];
    private static InitSets()
    {
        let Walking = new TBX.SpriteSet(null, [
            'Resources/Textures/Actors/peasant02_01.png',
            'Resources/Textures/Actors/peasant02_02.png',
        ], 'walking')

        Walking.Seed = 5;

        let Idle = new TBX.SpriteSet(null, [
                'Resources/Textures/Actors/peasant02_01.png',
            ], 'idle')
        
        Peasant.Sets = [Walking, Idle];
    }
}