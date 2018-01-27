export { GameScene };

import Engineer from "./Engineer";

import { Player } from "./Player";
import { Actor } from "./Actor";
import { Level } from "./Level";
import { SpriteSet } from "engineer-js";

class GameScene extends Engineer.Scene2D
{
    private _UpdateTarget:boolean;
    private _Pause:boolean;
    private _Player:Player;
    private _Level:Level;
    
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public constructor()
    {
        super();
        this.Init();
    }
    public Init(): void
    {
        this.Name = "Game";
        this.BackColor = Engineer.Color.FromRGBA(0, 0, 0, 255);
        this._Player = new Player(this);
        this._Level = new Level(this, this._Player);
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
        
        this._UpdateTarget = true;
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
        // Key Code here
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        for(let i = this._Level.Actors.length - 1; i >= 0; i--)
        {
            if(this._UpdateTarget) this._Level.Actors[i].Target = this._Player.Actor;
            this.CheckProjectiles(this._Level.Actors[i]);
            this._Level.Actors[i].Update();
            if(this._Level.Actors[i].Dead)
            {
                this._Level.Actors.splice(i,1);
            }
        }
    }
    private CheckProjectiles(Actor:Actor) : void
    {
        if(Actor == this._Player.Actor) return;
        for(let i in this._Level.Actors)
        {
            for(let j in this._Level.Actors[i].Weapon.Projectiles)
            {
                let Projectile = this._Level.Actors[i].Weapon.Projectiles[j];
                if(Engineer.Vertex.Distance(Actor.Trans.Translation, Projectile.Trans.Translation) < 30)
                {
                    if(Projectile.Owner == 0)
                    {
                        Actor.Health -= Projectile.Damage;
                        Projectile.Duration = 0;
                    }
                }
            }
        }
    }
}