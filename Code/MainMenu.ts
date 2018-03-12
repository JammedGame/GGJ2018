export { MainMenu };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";

class MainMenu extends Engineer.Scene2D
{
    private _Game:Engineer.Game;
    private _Runner:Engineer.Runner;
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
        let Buttons:any = new Engineer.ImageCollection(null, ["Resources/Textures/Play.png"]);
        let Play:any = new Engineer.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new Engineer.Vertex(300, 150, 1);
        Play.Trans.Translation = new Engineer.Vertex(960, 930, 0.2);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.AddSceneObject(Play);
        let Tile = new Engineer.Tile();
        Tile.Collection = new Engineer.ImageCollection(null, ["Resources/Textures/cover.png"]);
        Tile.Index = 0;
        Tile.Fixed = true;
        Tile.Trans.Translation = new Engineer.Vertex(960,540,0.0);
        Tile.Trans.Scale = new Engineer.Vertex(1920,1080,0);
        this.AddSceneObject(Tile);
        this._Game.AddScene(this);
    }
    public PlayClick(G:any, Args:any) : void
    {
        let Scene = new GameScene();
        this._Game.AddScene(Scene);
        this._Runner.SwitchScene("Game", false);
    }
}