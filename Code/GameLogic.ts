export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";

class GameLogic
{
    private _Game:Engineer.Game;
    private _Runner:Engineer.Runner;
    public constructor()
    {
        this._Game = new Engineer.Game();
        this._Game.Name = "GGJ2018";
        this._Runner = new Engineer.Runner(this._Game, Engineer.DrawEngineType.WebGL2);
        this._Runner.SetResolution(new Engineer.Vertex(1920, 1080, 0), false);
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        this._Game.AddScene(_Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu", false);
        this._Runner.Run();
    }
}