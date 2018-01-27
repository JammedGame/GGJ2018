export { GameScene };

import Engineer from "./Engineer";

import { Player } from "./Player";
import { Actor } from "./Actor";

class GameScene extends Engineer.Scene2D
{
    private _UpdateTarget:boolean;
    private _Pause:boolean;
    private _Player:Player;
    private _Actors:Actor[];
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
        this._Actors = [];
        this.BackColor = Engineer.Color.FromRGBA(0, 0, 0, 255);
        this._Player = new Player(this);
        this.AddActor(new Engineer.Vertex(500,500,0), Engineer.Color.Aqua);
        this.AddActor(new Engineer.Vertex(800,800,0), Engineer.Color.Purple);
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
        this._Player.Actor = this._Actors[0];
        this._UpdateTarget = true;
    }
    private AddActor(Location:Engineer.Vertex, Color:Engineer.Color) : void
    {
        let NewActor = new Actor(null, this, Location);
        NewActor.OnActorPossesed.push(this.ActorPossesed.bind(this));
        NewActor.Paint = Color;
        this._Actors.push(NewActor);
        this.AddSceneObject(NewActor);
    }
    private ActorPossesed(Actor:Actor) : void
    {
        this._Player.Actor = Actor;
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
        // Key Code here
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        for(let i = this._Actors.length - 1; i >= 0; i--)
        {
            if(this._UpdateTarget) this._Actors[i].Target = this._Player.Actor;
            this.CheckProjectiles(this._Actors[i]);
            this._Actors[i].Update();
            if(this._Actors[i].Dead)
            {
                this._Actors.splice(i,1);
            }
        }
    }
    private CheckProjectiles(Actor:Actor) : void
    {
        if(Actor == this._Player.Actor) return;
        for(let i in this._Actors)
        {
            for(let j in this._Actors[i].Weapon.Projectiles)
            {
                let Projectile = this._Actors[i].Weapon.Projectiles[j];
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