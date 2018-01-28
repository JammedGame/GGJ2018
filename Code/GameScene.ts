export { GameScene };

import Engineer from "./Engineer";

import { Player } from "./Player";
import { Actor } from "./Actor";
import { Level } from "./Level";
import { SpriteSet } from "engineer-js";

class GameScene extends Engineer.Scene2D
{
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
        this._Player = new Player(this, this.LevelComplete.bind(this));
        this._Level = new Level(this, this._Player);
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    public LevelComplete() : void
    {
        console.log("LVLCOMP");
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
        // Key Code here
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        this._Level.Update();
    }
}