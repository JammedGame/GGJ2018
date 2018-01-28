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
    private _Overlay:Engineer.Tile;
    private _OverlayPrompt:Engineer.Tile;
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
        this._Player = new Player(this, this.LevelComplete.bind(this), this.GameOver.bind(this));
        this._Level = new Level(this, this._Player);
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
        this.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Events.KeyUp.push(this.KeyUp.bind(this));
        this.CreateOverlay();
    }
    public LevelComplete() : void
    {
        this._Player.Reset();
        this._Level.Reset();
    }
    public GameOver() : void
    {
        this._Player.Reset();
        this._Level.ResetOver();
    }
    private KeyDown(G: any, Args: any): void
    {
        if(this._Pause) return;
        if(Args.KeyCode == 72)
        {
            this._Overlay.Active = true;
            this._OverlayPrompt.Active = false;
        }
    }
    private KeyUp(G: any, Args: any): void
    {
        if(this._Pause) return;
        if(Args.KeyCode == 72)
        {
            this._Overlay.Active = false;
            this._OverlayPrompt.Active = true;
        }
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        this._Level.Update();
    }
    private CreateOverlay() : void
    {
        let Tile = new Engineer.Tile();
        Tile.Collection = new Engineer.TileCollection(null, ["Resources/Textures/overlay.png"]);
        Tile.Index = 0;
        Tile.Fixed = true;
        Tile.Trans.Translation = new Engineer.Vertex(960,540,1.5);
        Tile.Trans.Scale = new Engineer.Vertex(1520,780,1);
        this._Overlay = Tile;
        Tile.Active = false;
        this.AddSceneObject(Tile);
        let Tile1 = new Engineer.Tile();
        Tile1.Collection = new Engineer.TileCollection(null, ["Resources/Textures/hint.png"]);
        Tile1.Index = 0;
        Tile1.Fixed = true;
        Tile1.Trans.Translation = new Engineer.Vertex(1600,950,1.4);
        Tile1.Trans.Scale = new Engineer.Vertex(320,80,1);
        this._OverlayPrompt = Tile1;
        this.AddSceneObject(Tile1);
    }
}