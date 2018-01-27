export { GameScene };

import Engineer from "./Engineer";

import { Player } from "./Player";
import { Actor } from "./Actor";

class GameScene extends Engineer.Scene2D
{
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
        this.BackColor = Engineer.Color.FromRGBA(0, 0, 0, 255);
        this._Player = new Player(this);
        this._Actors = [];
        this.AddActor(new Engineer.Vertex(500,500,0), Engineer.Color.Aqua);
        this.AddActor(new Engineer.Vertex(800,800,0), Engineer.Color.Purple);

        this._Player.Actor = this._Actors[1];
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
        // Update Code here
    }
}