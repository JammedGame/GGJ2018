export { GameLogic };

import * as TBX from "toybox-engine";

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";

class GameLogic
{
    private _Game:TBX.Game;
    private _Runner:TBX.Runner;
    public constructor()
    {
        TBX.Collision.AdditionalSideCheck = false;
        this._Game = new TBX.Game();
        this._Game.Name = "GGJ2018";
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0), false);
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        this._Game.Attach(_Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}