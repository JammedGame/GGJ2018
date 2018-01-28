export { Terminal }

import { Actor } from "../Actor";
import { Scene2D, Vertex, SpriteSet } from "engineer-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../Projectile";
import { SniperBehaviour } from "../SniperBehaviour";

class Terminal extends Actor
{
    public Init(Scene: Scene2D, Location: Vertex)
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
    private static Sets:Engineer.SpriteSet[];
    private static InitSets()
    {
        let Idle = new SpriteSet(null, 'idle', [
                '/Resources/Textures/console.png',
            ])
        
        Terminal.Sets = [Idle];
    }
}