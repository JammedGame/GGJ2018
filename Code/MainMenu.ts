export { MainMenu };

import * as TBX from "toybox-engine";

import { GameScene } from "./GameScene";

class MainMenu extends TBX.Scene2D
{
    private _Game:TBX.Game;
    private _Runner:TBX.Runner;
    public constructor(Runner:any, Game:any)
    {
        super();
        this._Game = Game;
        this._Runner = Runner;
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        let Buttons:any = new TBX.ImageCollection(null, ["Resources/Textures/Play.png"]);
        let Play:any = new TBX.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new TBX.Vertex(300, 150, 1);
        Play.Trans.Translation = new TBX.Vertex(960, 930, 0.2);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.Attach(Play);
        let Tile = new TBX.Tile();
        Tile.Collection = new TBX.ImageCollection(null, ["Resources/Textures/cover.png"]);
        Tile.Index = 0;
        Tile.Fixed = true;
        Tile.Trans.Translation = new TBX.Vertex(960,540,0.0);
        Tile.Trans.Scale = new TBX.Vertex(1920,1080,0);
        this.Attach(Tile);
        this._Game.Attach(this);
    }
    public PlayClick(G:any, Args:any) : void
    {
        let Scene = new GameScene();
        this._Game.Attach(Scene);
        this._Runner.SwitchScene("Game");
    }
}