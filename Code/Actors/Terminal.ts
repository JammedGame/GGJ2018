export { Terminal }

import * as TBX from "toybox-engine";

import { Actor } from "../Actor";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";
import { SniperBehaviour } from "../SniperBehaviour";

class Terminal extends Actor
{
    public Init(Scene: TBX.Scene2D, Location: TBX.Vertex)
    {
        super.Init(Scene, Location)
        this._Behaviour = null;
        this.Health = 1000;
        this.MaxHealth = 1000;
        this.Weapon = null;
        this._Terminal = true;
        if(!Terminal.Sets) Terminal.InitSets();
        this.SpriteSets = Terminal.Sets;
        this.SetSpriteSetByName('idle');  
    }
    private static Sets:TBX.SpriteSet[];
    private static InitSets()
    {
        let Idle = new TBX.SpriteSet(null, [
                'Resources/Textures/console.png',
            ], 'idle')
        
        Terminal.Sets = [Idle];
    }
}