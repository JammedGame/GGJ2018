export { Sniper }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";
import { SniperBehaviour } from "../SniperBehaviour";

class Sniper extends Actor {

    public Init(Scene: Scene2D, Location: Vertex)
    {
        super.Init(Scene, Location)
        this._Behaviour = new SniperBehaviour(null, this._Scene, this);
        this.Health = 80;
        this.MaxHealth = 80;
        this._Explosive = true;
        this.Weapon = new Weapon(Scene, 20, new Projectile(null, 8, 150, 1), '/Resources/Sounds/sniper_shot.wav');
        if(!Sniper.Sets) Sniper.InitSets();
        this.SpriteSets = Sniper.Sets;
        this.SetSpriteSetByName('idle');  
    }
    private static Sets:Engineer.SpriteSet[];
    private static InitSets()
    {
        let Walking = new SpriteSet(null, [
            'Resources/Textures/Actors/sniper01_01.png',
            'Resources/Textures/Actors/sniper01_02.png'
        ], 'walking')

        Walking.Seed = 5;

        let Idle = new SpriteSet(null, [
                'Resources/Textures/Actors/sniper01_01.png',
            ], 'idle')
        
            Sniper.Sets = [Walking, Idle];
    }
}