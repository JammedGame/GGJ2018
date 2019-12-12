export { GameScene };

import * as TBX from "toybox-engine";

import { Player } from "./Player";
import { Actor } from "./Actor";
import { Level } from "./Level";

class GameScene extends TBX.Scene2D
{
    private _Pause:boolean;
    private _Player:Player;
    private _Level:Level;
    private _Overlay:TBX.Tile;
    private _OverlayPrompt:TBX.Tile;
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
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
        if(TBX.Runner.Current.TouchscreenDevice())
        {
            let DPad = new TBX.DPad(null, new TBX.Vertex(150,930,2), new TBX.Vertex(400,400,1));
            DPad.SetColors(TBX.Color.White, TBX.Color.FromString("#F0E68C"));
            this.Attach(DPad);
            let Analog = new TBX.Analog(null, new TBX.Vertex(1770,930,2), new TBX.Vertex(400,400,1));
            Analog.SetColors(TBX.Color.White, TBX.Color.FromString("#F0E68C"));
            this.Attach(Analog);
        }
        this._Player = new Player(this, this.LevelComplete.bind(this), this.GameOver.bind(this));
        this._Level = new Level(this, this._Player);
        this.Events.Update.push(this.SceneUpdate.bind(this));
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
        let Tile = new TBX.Tile();
        Tile.Collection = new TBX.ImageCollection(null, ["Resources/Textures/overlay.png"]);
        Tile.Index = 0;
        Tile.Fixed = true;
        Tile.Trans.Translation = new TBX.Vertex(960,540,1.5);
        Tile.Trans.Scale = new TBX.Vertex(1520,780,1);
        this._Overlay = Tile;
        Tile.Active = false;
        if(!TBX.Runner.Current.TouchscreenDevice()) this.Attach(Tile);
        let Tile1 = new TBX.Tile();
        Tile1.Collection = new TBX.ImageCollection(null, ["Resources/Textures/hint.png"]);
        Tile1.Index = 0;
        Tile1.Fixed = true;
        Tile1.Trans.Translation = new TBX.Vertex(1600,950,1.4);
        Tile1.Trans.Scale = new TBX.Vertex(320,80,1);
        this._OverlayPrompt = Tile1;
        if(!TBX.Runner.Current.TouchscreenDevice()) this.Attach(Tile1);
    }
}