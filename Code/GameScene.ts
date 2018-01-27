export { GameScene };

import Engineer from "./Engineer";

import { Actor } from "./Actor";

class GameScene extends Engineer.Scene2D
{
    private _Pause:boolean;
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
        this.AddActor(new Engineer.Vertex(500,500,0));
    }
    private AddActor(Location:Engineer.Vertex)
    {
        let NewActor = new Actor();
        NewActor.Trans.Translation = Location;
        this._Actors.push(NewActor);
        this.AddSceneObject(NewActor);
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