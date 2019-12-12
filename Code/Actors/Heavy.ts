export { Heavy }

import * as TBX from "toybox-engine";

import { Actor } from "../Actor";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";

class Heavy extends Actor {

    public Init(Scene: TBX.Scene2D, Location: TBX.Vertex)
    {
        super.Init(Scene, Location)
        this.Speed = 6;
        this.Health = 200;
        this.MaxHealth = 200;
        this._Explosive = true;
        this.Weapon = new Weapon(Scene, 5, new Projectile(null, 12, 45), '/Resources/Sounds/machinegunshot.wav');
        if(!Heavy.Sets) Heavy.InitSets();
        this.SpriteSets = Heavy.Sets;
        this.SetSpriteSetByName('idle'); 
    }
    private static Sets:TBX.SpriteSet[];
    private static InitSets()
    {
        let Walking = new TBX.SpriteSet(null, [
            'Resources/Textures/Actors/heavy04_01.png',
            'Resources/Textures/Actors/heavy04_02.png'
        ], 'walking')

        Walking.Seed = 5;

        let Idle = new TBX.SpriteSet(null, [
                'Resources/Textures/Actors/heavy04_01.png',
            ], 'idle')
        
        Heavy.Sets = [Walking, Idle];
    }
}